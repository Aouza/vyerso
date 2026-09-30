-- service_role não recebe DML por padrão em tabelas novas (deny-by-default, ADR-013).
-- Concede somente leitura: o pipeline server-side e os testes de integração precisam ler connections.
-- Escrita de service_role em connections NÃO é concedida (o produto escreve via sessão do usuário + RLS).
grant select on public.connections to service_role;
