import Link from "next/link";
import { copy } from "@/features/connections/copy";
import { listConnections } from "@/features/connections/queries";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";

export default async function ConnectionsPage() {
  const supabase = await createSupabaseServerClient();
  const connections = await listConnections(supabase);

  return (
    <main className="flex max-w-2xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {copy.listTitle}
        </h1>
        <Link href="/connections/new" className="underline">
          {copy.newLink}
        </Link>
      </div>
      {connections.length === 0 ? (
        <p className="text-zinc-600">{copy.empty}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-zinc-200">
          {connections.map((c) => (
            <li key={c.id} className="py-3">
              {c.displayName}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
