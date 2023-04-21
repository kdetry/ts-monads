export interface IMonad<A> {
  map<B>(f: (a: A) => B): IMonad<B>;
  chain<B>(f: (a: A) => IMonad<B>): IMonad<B>;
}
