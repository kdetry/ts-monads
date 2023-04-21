import { IMonad } from "../types/Monad";

export class Writer<W, A> implements IMonad<A> {
  constructor(private value: A, private log: W[]) {}

  static of<W, A>(value: A, log?: W[]): Writer<W, A> {
    return new Writer(value, log || []);
  }

  getValue(): A {
    return this.value;
  }

  getLog(): W[] {
    return this.log;
  }

  map<B>(f: (a: A) => B): Writer<W, B> {
    return new Writer(f(this.value), this.log);
  }

  chain<B>(f: (a: A) => Writer<W, B>): Writer<W, B> {
    const writer = f(this.value);
    return new Writer(writer.getValue(), this.log.concat(writer.getLog()));
  }
}
