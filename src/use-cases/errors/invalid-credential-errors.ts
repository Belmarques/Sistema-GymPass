export class InvalidCredentialError extends Error {
  constructor() {
    super('User Not Found')
  }
}
