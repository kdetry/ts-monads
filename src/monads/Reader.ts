import { IMonad } from "../types/Monad";

export class Reader<R, A> implements IMonad<A> {
  constructor(private runReader: (r: R) => A) {}

  static of<R, A>(a: A): Reader<R, A> {
    return new Reader(() => a);
  }

  run(r: R): A {
    return this.runReader(r);
  }

  map<B>(f: (a: A) => B): Reader<R, B> {
    return new Reader((r: R) => f(this.run(r)));
  }

  chain<B>(f: (a: A) => Reader<R, B>): Reader<R, B> {
    return new Reader((r: R) => f(this.run(r)).run(r));
  }
}
