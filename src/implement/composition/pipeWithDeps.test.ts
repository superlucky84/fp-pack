import { describe, it, expect, vi } from "vitest";
import pipeWithDeps from "./pipeWithDeps";
import pipe from "./pipe";
import pipeSideEffect from "./pipeSideEffect";
import SideEffect, { isSideEffect } from "./sideEffect";
import pipeAsyncSideEffect from "../async/pipeAsyncSideEffect";
import from from "./from";

describe("pipeWithDeps", () => {
  it("uses default input values while supplying dependencies", () => {
    const pipeline = pipeWithDeps(pipe)(
      (value = 2, deps: { add: number }) => value + deps.add,
      (value) => value * 2,
    );
    expect(pipeline()({ add: 3 })).toBe(10);
    expect(pipeline(4)({ add: 3 })).toBe(14);
  });

  it("infers from() chains and stops before later dependency-using steps", async () => {
    const log = vi.fn();
    const pipeline = pipeWithDeps(pipeAsyncSideEffect)(
      from(2),
      async (value, deps: { limit: number }) =>
        value < deps.limit ? SideEffect.of(() => "LOW") : value,
      (value, deps: { log: (value: number) => void }) => {
        deps.log(value);
        return value.toFixed();
      },
    );
    const stopped = await pipeline()({ limit: 3, log });
    expect(isSideEffect(stopped)).toBe(true);
    expect(log).not.toHaveBeenCalled();
    expect(await pipeline()({ limit: 1, log })).toBe("2");
    expect(log).toHaveBeenCalledWith(2);
  });

  it("injects deps into sync pipelines", () => {
    const run = pipeWithDeps(pipe)(
      2,
      (value: number, deps: { add: number }) => value + deps.add,
      (value: number) => value * 2,
    );

    expect(run({ add: 3 })).toBe(10);
  });

  it("supports data-last pipelines", () => {
    const pipeline = pipeWithDeps(pipe)(
      (value: number, deps: { add: number }) => value + deps.add,
      (value: number) => value * 2,
    );

    expect(pipeline(2)({ add: 3 })).toBe(10);
  });

  it("accepts SideEffect input for SideEffect pipes", () => {
    const pipeline = pipeWithDeps(pipeSideEffect)((value: number) => value + 1);
    const result = pipeline(SideEffect.of(() => "STOP"))(undefined);

    expect(isSideEffect(result)).toBe(true);
  });

  it("injects deps into async pipelines", async () => {
    const log = vi.fn();
    const run = pipeWithDeps(pipeAsyncSideEffect)(
      1,
      async (
        id: number,
        deps: { fetchUser: (id: number) => Promise<{ name: string }> },
      ) => deps.fetchUser(id),
      (user: { name: string }) => user.name,
      (name: string, deps: { log: (msg: string) => void }) => {
        deps.log(name);
        return name.length;
      },
    );

    const result = await run({
      fetchUser: async (id: number) => ({ name: `user-${id}` }),
      log,
    });

    expect(result).toBe(6);
    expect(log).toHaveBeenCalledWith("user-1");
  });

  it("supports data-last async pipelines", async () => {
    const log = vi.fn();
    const pipeline = pipeWithDeps(pipeAsyncSideEffect)(
      async (
        id: number,
        deps: { fetchUser: (id: number) => Promise<{ name: string }> },
      ) => deps.fetchUser(id),
      (user: { name: string }) => user.name,
      (name: string, deps: { log: (msg: string) => void }) => {
        deps.log(name);
        return name.length;
      },
    );

    const result = await pipeline(2)({
      fetchUser: async (id: number) => ({ name: `user-${id}` }),
      log,
    });

    expect(result).toBe(6);
    expect(log).toHaveBeenCalledWith("user-2");
  });
});
