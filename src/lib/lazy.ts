import { lazyResolve } from "./lazy-symbols";
import { LazyFactory } from "../types/lazy-factory";
import { Lazy } from "../types/lazy";
import { LazyTimeoutError } from "./timeout-error";

const lazyFactory = <T>(): Lazy<T> => {
    let resolve: (value: T) => void;

    const promise = new Promise<T>((res) => {
        resolve = res;
    });

    const lazyValue: Lazy<T> = {
        [lazyResolve]: resolve!,
        then: promise.then.bind(promise),

        withTimeout: (timeoutMs) => {
            return new Promise<T>((res, rej) => {
                const timeout = setTimeout(() => {
                    rej(new LazyTimeoutError(timeoutMs));
                }, timeoutMs);

                promise.then(
                    (value) => {
                        clearTimeout(timeout);
                        res(value);
                    },
                    (reason) => {
                        clearTimeout(timeout);
                        rej(reason);
                    }
                );
            });
        },
    };

    return lazyValue;
};

/**
 * Creates a lazy value.
 */
export const lazy: LazyFactory = Object.assign(lazyFactory, {
    resolve: <T>(lazyValue: Lazy<T>, value?: T) => {
        if (lazyValue[lazyResolve] === undefined) {
            throw new Error(
                `Cannot resolve a non-lazy value. Expected a value of type Lazy<T> but got ${typeof lazyValue}.`
            );
        }

        lazyValue[lazyResolve](value!);
    },

    number: () => lazyFactory<number>(),
    string: () => lazyFactory<string>(),
    boolean: () => lazyFactory<boolean>(),
    array: <T>() => lazyFactory<T[]>(),
    signal: () => lazyFactory<void>(),
});
