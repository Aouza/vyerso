import "server-only";
import { serverSchema } from "./env";

/** Somente servidor. Nunca importar em código de cliente. */
export function getServerEnv() {
  return serverSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}
