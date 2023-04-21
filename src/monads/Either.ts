import { IMonad } from "../types/Monad";

// Either Monad
export class Either<L, R> implements IMonad<R> {
  constructor(private left: L | null, private right: R | null) {}

  static left<L, R>(left: L): Either<L, R> {
    return new Either<L, R>(left, null);
  }

  static right<L, R>(right: R): Either<L, R> {
    return new Either<L, R>(null, right);
  }

  map<S>(f: (value: R) => S): Either<L, S> {
    return this.right === null
      ? Either.left<L, S>(this.left!)
      : Either.right<L, S>(f(this.right));
  }

  chain<S>(f: (value: R) => Either<L, S>): Either<L, S> {
    return this.right === null ? Either.left<L, S>(this.left!) : f(this.right);
  }

  getOrElse(f: () => R): R {
    return this.right === null ? f() : this.right;
  }

  finally(fL: (value: L) => void, fR: (value: R) => void): Either<L, R> {
    if (this.right !== null) {
      fR(this.right);
    }
    if (this.left !== null) {
      fL(this.left);
    }
    return this;
  }
}
