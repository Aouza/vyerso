import { beforeEach, describe, expect, it, vi } from "vitest";

const verifyOtp = vi.fn();
const createClient = vi.fn(async () => ({ auth: { verifyOtp } }));

vi.mock("@/infrastructure/supabase/server", () => ({
  createSupabaseServerClient: () => createClient(),
}));

import { GET } from "./route";

const call = (qs: string) =>
  GET(new Request(`http://localhost:3000/auth/confirm${qs}`) as never);

const location = (res: Response) => new URL(res.headers.get("location")!);

beforeEach(() => {
  verifyOtp.mockReset();
  createClient.mockClear();
});

describe("GET /auth/confirm", () => {
  it("sem token_hash volta ao login sem tocar no Supabase", async () => {
    const res = await call("?type=email");
    expect(location(res).pathname + location(res).search).toBe(
      "/login?erro=link",
    );
    expect(createClient).not.toHaveBeenCalled();
  });

  it("type diferente de email é recusado", async () => {
    const res = await call("?token_hash=abc&type=recovery");
    expect(location(res).search).toBe("?erro=link");
    expect(verifyOtp).not.toHaveBeenCalled();
  });

  it("link inválido ou expirado volta ao login", async () => {
    verifyOtp.mockResolvedValue({ error: { message: "expired" } });
    const res = await call("?token_hash=abc&type=email");
    expect(location(res).pathname).toBe("/login");
    expect(location(res).search).toBe("?erro=link");
  });

  it("sucesso vai para /connections e ignora parâmetro next (sem open redirect)", async () => {
    verifyOtp.mockResolvedValue({ error: null });
    const res = await call(
      "?token_hash=abc&type=email&next=https://evil.example",
    );
    expect(location(res).origin).toBe("http://localhost:3000");
    expect(location(res).pathname).toBe("/connections");
    expect(verifyOtp).toHaveBeenCalledWith({
      type: "email",
      token_hash: "abc",
    });
  });
});
