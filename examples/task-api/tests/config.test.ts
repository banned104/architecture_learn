import { describe, expect, it } from "vitest";
import { parsePort } from "../src/config.js";

describe("parsePort", () => {
  it("uses 3000 when PORT is absent", () => {
    expect(parsePort(undefined)).toBe(3000);
  });

  it.each(["abc", "0", "65536", "3.5"])("rejects invalid PORT %s", (value) => {
    expect(() => parsePort(value)).toThrow("PORT 必须是");
  });
});
