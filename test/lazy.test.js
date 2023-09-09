import { expect, test } from "bun:test";

import { lazy, lazyResolve } from "../dist";

test("lazy value factory creates a lazy value", () => {
    const x = lazy();

    expect(x[lazyResolve]).toBeTruthy();
});

test("lazy value factory helper methods exist", () => {
    expect(lazy.number).toBeFunction();
    expect(lazy.string).toBeFunction();
    expect(lazy.boolean).toBeFunction();
    expect(lazy.array).toBeFunction();
    expect(lazy.signal).toBeFunction();
});

test("lazy value factory helper methods return lazy values", () => {
    expect(lazy.number()[lazyResolve]).toBeTruthy();
    expect(lazy.string()[lazyResolve]).toBeTruthy();
    expect(lazy.boolean()[lazyResolve]).toBeTruthy();
    expect(lazy.array()[lazyResolve]).toBeTruthy();
    expect(lazy.signal()[lazyResolve]).toBeTruthy();
});

test("lazy value resolution", async () => {
    const anything = lazy();
    const string = lazy.string();
    const number = lazy.number();
    const boolean = lazy.boolean();
    const array = lazy.array();
    const signal = lazy.signal();

    lazy.resolve(anything, {});
    lazy.resolve(string, "string");
    lazy.resolve(number, 123);
    lazy.resolve(boolean, true);
    lazy.resolve(array, [1, 2, 3]);
    lazy.resolve(signal);

    expect(await anything).toBeTruthy();
    expect(await string).toBeString();
    expect(await number).toBeNumber();
    expect(await boolean).toBeBoolean();
    expect(await array).toBeArray();
    expect(await signal).toBeUndefined();
});
