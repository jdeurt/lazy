import type { Lazy } from "./lazy";

interface LazyFactoryResolveFunction {
    (lazyValue: Lazy<void>): void;
    <T>(lazyValue: Lazy<T>, value: T | PromiseLike<T>): void;
}

/**
 * Creates a lazy value.
 */
export type LazyFactory = (<T>() => Lazy<T>) & {
    /**
     * Resolves a lazy value.
     *
     * @throws A TypeError if `lazyValue` is not lazy.
     */
    resolve: LazyFactoryResolveFunction;

    /**
     * Creates a lazy value that should resolve to a number.
     */
    number: () => Lazy<number>;

    /**
     * Creates a lazy value that should resolve to a string.
     */
    string: () => Lazy<string>;

    /**
     * Creates a lazy value that should resolve to a boolean.
     */
    boolean: () => Lazy<boolean>;

    /**
     * Creates a lazy value that should resolve to an array.
     */
    array: <T>() => Lazy<T[]>;

    /**
     * Creates a lazy value that should resolve to nothing.
     */
    signal: () => Lazy<void>;
};
