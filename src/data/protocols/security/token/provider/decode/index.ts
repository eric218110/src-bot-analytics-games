export type TokenProvider = {
  decodeToken: <T = object>(token: string) => T
}
