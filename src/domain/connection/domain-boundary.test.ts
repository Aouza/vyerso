import { describe, expect, it } from "vitest";
import * as domain from "./index";

describe("domain/connection", () => {
  it("carrega sem Supabase, rede ou LLM", () => {
    expect(domain).toBeDefined();
  });
});
