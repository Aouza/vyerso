import { copy } from "@/features/connections/copy";
import { CreateConnectionForm } from "@/features/connections/create-form";

export default function NewConnectionPage() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">{copy.newTitle}</h1>
      <CreateConnectionForm />
    </main>
  );
}
