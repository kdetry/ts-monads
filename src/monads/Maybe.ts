import { IMonad } from "../types/Monad";

// Maybe Monad
export class Maybe<T> implements IMonad<T> {
  constructor(private value: T | null) {}

  static just<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static nothing<R>(): Maybe<R> {
    return new Maybe<R>(null);
  }

  static value<T>(value: T | null): Maybe<T> {
    return new Maybe<T>(value);
  }

  map<R>(f: (value: T) => R): Maybe<R> {
    return this.value === null
      ? Maybe.nothing<R>()
      : Maybe.just<R>(f(this.value));
  }

  chain<R>(f: (value: T) => Maybe<R>): Maybe<R> {
    return this.value === null ? Maybe.nothing<R>() : f(this.value);
  }

  getOrElse(defaultProvider: () => T): T {
    return this.value === null ? defaultProvider() : this.value;
  }

  finally(f: (value: T | null) => void): Maybe<T> {
    f(this.value);
    return this;
  }
}
