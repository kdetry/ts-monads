import { Either, IO, Identity, Maybe, Reader, State, Writer } from "./monads";

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [];

// *** Example with Either Monad ***
// Either Monad
function validateEmail(email: string): Either<string, string> {
  const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return re.test(email)
    ? Either.right<string, string>(email)
    : Either.left<string, string>("Invalid email");
}

// Check if user exists
function findUserByEmail(email: string): Maybe<User> {
  const user = users.find((user) => user.email === email);
  return user ? Maybe.just(user) : Maybe.nothing<User>();
}

// Register a new user
function registerUser(name: string, email: string): Either<string, User> {
  return validateEmail(email).chain((validEmail) => {
    return findUserByEmail(validEmail)
      .map((existingUser) => Either.left<string, User>("User already exists"))
      .getOrElse(() => {
        const newUser: User = { id: users.length + 1, name, email: validEmail };
        users.push(newUser);
        return Either.right<string, User>(newUser);
      });
  });
}

registerUser("John Doe", "john.doe@example.com").finally(
  (error) => console.log(`Error: ${error}`),
  (user) => console.log(`User created: ${JSON.stringify(user)}`)
);

// *** Example with Identity Monad ***
// Identity Monad
const identity = Identity.of<number>(2)
  .map((n) => n + 1)
  .chain((n) => Identity.of<number>(n * 2));
console.log("identity", identity);

// *** Example with State Monad ***
// State Monad
const increment = (n: number): State<number, number> =>
  State.of<number, number>(n + 1);

const initialState = 0;
const [result, newState] = increment(2).run(initialState); // [3, 0]
console.log(result, newState);

// *** Example with Reader Monad ***
// Reader Monad
type Config = { apiUrl: string; apiKey: string };
const getConfig = (key: keyof Config): Reader<Config, string> =>
  new Reader((config) => config[key]);

const config: Config = { apiUrl: "https://api.example.com", apiKey: "12345" };
const apiUrl = getConfig("apiUrl").run(config); // "https://api.example.com"
console.log("apiUrl", apiUrl);

// *** Example with Writer Monad ***
// Writer Monad
const sum = (a: number, b: number): Writer<string, number> =>
  Writer.of(a + b, [`Adding ${a} and ${b}`]);

const product = (a: number, b: number): Writer<string, number> =>
  Writer.of(a * b, [`Multiplying ${a} and ${b}`]);

const combined = sum(3, 4)
  .chain((result1) => product(result1, 2))
  .chain((result2) => sum(result2, 1));

console.log("combined.getValue()", combined.getValue()); // 15
console.log("combined.getLog()", combined.getLog());

// *** Example with IO Monad ***
// IO Monad
const readApiEndpoint = (url: string): IO<Promise<Response>> =>
  new IO(() => fetch(url));

const fileContentIO = readApiEndpoint("https://dummyjson.com/products");
fileContentIO
  .run()
  .then((content) => content.json())
  .catch((error) => console.error(error));

