import { z } from "zod";

export const CONTEXT_TYPES = ["partner", "dating", "ex"] as const;
export type ContextType = (typeof CONTEXT_TYPES)[number];

// Postgres char_length conta code points; JS .length conta unidades UTF-16.
const codePoints = (s: string) => [...s].length;

export const createConnectionInputSchema = z.object({
  displayName: z
    .string()
    .trim()
    .refine((s) => codePoints(s) >= 1, "Informe um nome.")
    .refine((s) => codePoints(s) <= 80, "Use no máximo 80 caracteres."),
  contextType: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.enum(CONTEXT_TYPES).optional(),
  ),
});
export type CreateConnectionInput = z.infer<typeof createConnectionInputSchema>;

export const connectionRowSchema = z
  .object({
    id: z.uuid(),
    display_name: z.string(),
    context_type: z.enum(CONTEXT_TYPES).nullable(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
  })
  .transform((r) => ({
    id: r.id,
    displayName: r.display_name,
    contextType: r.context_type,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
export type Connection = z.output<typeof connectionRowSchema>;
