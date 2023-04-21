import { IMonad } from "../types/Monad";

export class IO<A> implements IMonad<A> {
  constructor(private unsafePerformIO: () => A) {}

  static of<A>(a: A): IO<A> {
    return new IO(() => a);
  }

  run(): A {
    return this.unsafePerformIO();
  }

  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.run()));
  }

  chain<B>(f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(this.run()).run());
  }

  finally(f: (a: A) => void): IO<A> {
    return new IO(() => {
      const a = this.run();
      f(a);
      return a;
    });
  }
}
