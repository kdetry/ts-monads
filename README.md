# Monad and Monadic Approach with Typescript

This repository has been created for self-education purposes, at least for now.

## About the Repo

- the **"monads"** folder includes monads
- the **"main.ts"** file includes basic usages for every monad
- I have added a command line counter app in the **"examples"** folder but you have to build it with tsc (it may works with node-ts, IDK)

## What are monads?

**Monad** and **monadic approach** are important concepts in the world of functional programming. Monads are abstract structures that allow values and operations to be combined in a regular and secure way.

Monads have the following characteristics:

- There is an `of` or `unit` function to wrap a value.
- The `map` function takes the value of the current monad and creates a new monad by transforming this value with a function.
- The `chain` or `flatMap` function takes the value of the current monad and applies a function that returns another monad.

These features allow monads to manage values and operations in a sequential and secure way.

The monads that I share under this topic are:

### Maybe Monad

Used to handle error cases in a secure way. It has two subclasses: `Just`, which represents the result of a successful operation, and `Nothing`, which is used when the operation fails.

### Either Monad

Used to make a decision-mechanism between successful and unsuccessful results. It has two subclasses: `Left`, which represents the erroneous result, and `Right`, which represents the successful result.

### Try Monad (NOT READY)

Used to manage error cases. It has two subclasses: `Success`, which represents a successful operation, and `Failure`, which represents a failed operation.

Monads and monadic approaches make programming structures more understandable and manageable, while also allowing errors and operations to be handled safely and flexibly.

### Identity Monad

The Identity Monad is the simplest monad that doesn't add any additional behavior to the wrapped value. It is useful for understanding the basic monad structure, testing, and using in places where a monad is required but no additional behavior is needed.

### IO Monad

The IO Monad is used to encapsulate and manage side effects, particularly those involving input/output operations. It allows you to separate pure and impure code, providing a structure to handle side effects in a functional way.

### Reader Monad

The Reader Monad allows you to pass a shared environment to multiple functions without explicitly passing the environment as a parameter. It is particularly useful for dependency injection and managing configuration data.

### State Monad

The State Monad is used to manage mutable state in a functional way. It encapsulates state transformations, allowing you to chain stateful computations and maintain state across multiple operations without using mutable variables.

### Writer Monad

The Writer Monad is designed for accumulating additional data during a computation, such as log messages or other metadata. It provides a way to collect data alongside the main computation without interfering with it, ensuring that the main computation remains pure.
