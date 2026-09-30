-- M1: connections (docs/DATABASE.md v0.2 §10.2). Deny-by-default.

-- Novas tabelas em public não herdam grants para anon/authenticated.
alter default privileges in schema public revoke all on tables from anon, authenticated;

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end
$$;
revoke all on function public.set_updated_at() from public, anon, authenticated;

create table public.connections (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null default auth.uid()
                  references auth.users (id) on delete cascade,
  display_name  text not null check (char_length(display_name) between 1 and 80),
  context_type  text check (context_type in ('partner', 'dating', 'ex')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (id, owner_user_id)
);

create index connections_owner_created_idx
  on public.connections (owner_user_id, created_at desc);

create trigger connections_set_updated_at
  before update on public.connections
  for each row execute function public.set_updated_at();

alter table public.connections enable row level security;
alter table public.connections force row level security;

revoke all on public.connections from public, anon, authenticated;
grant select on public.connections to authenticated;
grant insert (display_name, context_type) on public.connections to authenticated;
grant update (display_name, context_type) on public.connections to authenticated;
grant delete on public.connections to authenticated;

create policy connections_select_own on public.connections
  for select to authenticated
  using (owner_user_id = (select auth.uid()));

create policy connections_insert_own on public.connections
  for insert to authenticated
  with check (owner_user_id = (select auth.uid()));

create policy connections_update_own on public.connections
  for update to authenticated
  using (owner_user_id = (select auth.uid()))
  with check (owner_user_id = (select auth.uid()));

create policy connections_delete_own on public.connections
  for delete to authenticated
  using (owner_user_id = (select auth.uid()));

-- Aborta a migration se a RLS não estiver ativa e forçada.
do $$
begin
  if not exists (
    select 1 from pg_class
    where oid = 'public.connections'::regclass
      and relrowsecurity
      and relforcerowsecurity
  ) then
    raise exception 'RLS not enabled and forced on public.connections';
  end if;
end
$$;
