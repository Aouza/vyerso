import { signOut } from "@/features/auth/actions";
import { requireUser } from "@/features/auth/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-3">
        <span className="font-semibold">Vyerso</span>
        <form action={signOut} className="flex items-center gap-3 text-sm">
          <span className="text-zinc-600">{user.email}</span>
          <button type="submit" className="underline">
            Sair
          </button>
        </form>
      </header>
      <div className="flex flex-1 flex-col p-6">{children}</div>
    </div>
  );
}
