import * as readline from "readline-sync";

import { IO, State } from "../monads";

type Counter = number;

function readLine(): IO<string> {
  return new IO(() => readline.question("Enter 'inc', 'dec', or 'exit': "));
}

function updateCounter(input: string): State<Counter, void> {
  return new State<Counter, void>((counter) => {
    switch (input) {
      case "inc":
        return [undefined, counter + 1];
      case "dec":
        return [undefined, counter - 1];
      default:
        return [undefined, counter];
    }
  });
}

function loop(counter: Counter): IO<void> {
  return readLine().chain((input) => {
    if (input === "exit") {
      return IO.of(undefined);
    } else {
      const stateUpdate = updateCounter(input);
      const [_, newCounter] = stateUpdate.run(counter);
      console.log("Counter:", newCounter);
      return loop(newCounter);
    }
  });
}

loop(0).run();
