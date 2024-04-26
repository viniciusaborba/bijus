export class AlreadyExistsError extends Error {
  constructor(text: string) {
    super(`${text} already exists!`);
  }
}
