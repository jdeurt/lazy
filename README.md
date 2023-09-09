# @jdeurt/lazy

## Overview

This library provides a simple and convenient way to create and manage lazy values. Lazy values are objects that defer the computation of a value until it is actually needed. This library is built in a way that makes it easy to integrate with asynchronous operations and Promises.

Make sure to read the [Common Pitfalls](#common-pitfalls) section before getting started to check if this library is right for you.

## Features

- Promise-like API for lazy value resolution.
- Simple to use but highly extensible.

## Installation

```bash
npm install @jdeurt/lazy
```

Or using yarn:

```bash
yarn add @jdeurt/lazy
```

## Usage

## Basic Usage
```ts
import { lazy } from "@jdeurt/lazy";

const myLazyValue = lazy<number>();

// Later, resolve the value
lazy.resolve(myLazyValue, 42);
```

### Typed Lazy Values

Create typed lazy values to give yourself type hints in non-TS environments.

```js
import { lazy } from "@jdeurt/lazy";

const myLazyString = lazy.string();
const myLazyNumber = lazy.number();
const myLazyBoolean = lazy.boolean();
const myLazyArray = lazy.array();
```

### Promise-like API

Lazy values implement a `PromiseLike` interface, so they can be easily integrated into Promise-based code.

```ts
import { lazy } from "@jdeurt/lazy";

const myLazyValue = lazy<number>();

myLazyValue.then((value) => console.log(value));

// Resolve the value
lazy.resolve(myLazyValue, 42);
```

### Time limits

The `Lazy<T>` type has a `withTimeout` method, allowing you to specify a maximum time limit for the lazy value to resolve. If the value does not resolve within the given time, a `LazyTimeoutError` will be thrown.

```ts
import { lazy, LazyTimeoutError } from "@jdeurt/lazy";

const myLazyValue = lazy<number>();

async function main() {
    try {
        const value = await myLazyValue.withTimeout(2000);

        console.log(value);
    } catch (err) {
        if (err instanceof LazyTimeoutError) {
            // Catches the LazyTimeoutError if not resolved in time (2000ms)
            console.error("Lazy value timed out:", err);
        } else {
            console.error("Unknown error :(", err);
        }
    }
}

main();
```

## API Reference

### `LazyFactory`

A factory function for creating lazy values. Exported as `lazy`.

#### Methods

`<LazyFactory>.resolve(lazyValue: Lazy<T>, value: T): void`: Resolves a lazy value.

`<LazyFactory>.number(): Lazy<number>`: Creates a lazy value that should resolve to a number.

`<LazyFactory>.string(): Lazy<string>`: Creates a lazy value that should resolve to a string.

`<LazyFactory>.boolean(): Lazy<boolean>`: Creates a lazy value that should resolve to a boolean.

`<LazyFactory>.array<T>(): Lazy<T[]>`: Creates a lazy value that should resolve to an array of type T.

`<LazyFactory>.signal(): Lazy<void>`: Creates a lazy value that should resolve to void.

### `Lazy<T>`

Any lazy value returned by calling the `lazy` function.

#### Methods

`<Lazy<T>>.withTimeout(ms: number): Promise<T>`: Enforces a time limit on the resolution of a lazy value.

## Common Pitfalls

### Overengineering: Use Only When Needed

While this library provides an easy-to-use way to create lazy values, it's crucial to assess whether you actually need lazy evaluation for your specific use case. Lazy evaluation introduces an additional layer of complexity and abstraction, which might not be necessary for simpler tasks or could even be counterproductive.

Often, simpler constructs like native JavaScript `Promise`, `async`/`await`, or even straightforward conditional logic could be more suitable and efficient for your requirements.

### Deadlocks

Because lazy values can be deferred indefinitely, there's a risk of causing a deadlock in your application if you're not careful. Always ensure that the code that's supposed to resolve a lazy value is reachable and free of any conditions that might prevent it from running.

### Memory Overhead

Using lazy values for very simple or primitive data types can add unnecessary memory overhead compared to directly using those primitives. Be mindful of how you use lazy values in performance-critical or memory-sensitive applications.

### Error Handling

This library throws a runtime error when trying to resolve a non-lazy value. Be cautious about catching these errors properly in your application to avoid unintended crashes or undefined behavior.

### Timeout Errors

When using the `withTimeout` feature, be prepared to handle the `LazyTimeoutError` exception. Ignoring this could lead to unpredictable behavior in your application.

## License

This project is licensed under the MIT License.

