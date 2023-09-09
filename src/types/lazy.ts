import type { lazyResolve } from "../lib/lazy-symbols";

export interface Lazy<T> extends PromiseLike<T> {
    [lazyResolve]: (value: T) => void;

    /**
     * Indicates that the lazy value should resolve within a certain amount of time.
     *
     * @throws A LazyTimeoutError if the lazy value does not resolve within the given time.
     */
    withTimeout(timeoutMs: number): Promise<T>;
}
