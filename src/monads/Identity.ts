import { IMonad } from "../types/Monad";

// Identity Monad
export class Identity<T> implements IMonad<T> {
  constructor(private value: T) {}

  static of<T>(value: T): Identity<T> {
    return new Identity(value);
  }

  map<R>(f: (value: T) => R): Identity<R> {
    return Identity.of(f(this.value));
  }

  chain<R>(f: (value: T) => Identity<R>): Identity<R> {
    return f(this.value);
  }
}
