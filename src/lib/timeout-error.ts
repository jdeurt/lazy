export class LazyTimeoutError extends Error {
    name = "TimeoutError";

    constructor(ms: number) {
        super(`Timeout of ${ms}ms exceeded while awaiting lazy value.`);
    }
}
