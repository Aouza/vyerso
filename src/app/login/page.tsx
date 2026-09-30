import { LoginForm } from "@/features/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Entrar no Vyerso
      </h1>
      {erro === "link" && (
        <p role="alert" className="text-red-600">
          Link inválido ou expirado. Peça um novo.
        </p>
      )}
      <LoginForm />
    </main>
  );
}
