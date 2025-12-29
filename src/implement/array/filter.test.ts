import { describe, it, expect } from "vitest";
import filter from "./filter";

describe("filter", () => {
  it("filters items by predicate", () => {
    expect(filter((n: number) => n % 2 === 0, [1, 2, 3, 4])).toEqual([2, 4]);
  });

  it("returns an empty array when no items match", () => {
    expect(filter((n: number) => n > 10, [1, 2, 3])).toEqual([]);
  });

  it("returns empty array when input is empty", () => {
    expect(filter((n: number) => n > 0, [])).toEqual([]);
  });
});
