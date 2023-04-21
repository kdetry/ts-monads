import { IMonad } from "../types/Monad";

export class State<S, A> implements IMonad<A> {
  constructor(private runState: (s: S) => [A, S]) {}

  static of<S, A>(a: A): State<S, A> {
    return new State((s: S) => [a, s]);
  }

  run(s: S): [A, S] {
    return this.runState(s);
  }

  map<B>(f: (a: A) => B): State<S, B> {
    return new State((s: S) => {
      const [a, newState] = this.run(s);
      return [f(a), newState];
    });
  }

  chain<B>(f: (a: A) => State<S, B>): State<S, B> {
    return new State((s: S) => {
      const [a, newState] = this.run(s);
      return f(a).run(newState);
    });
  }
}
