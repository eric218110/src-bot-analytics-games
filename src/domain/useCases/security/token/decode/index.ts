export type DecodeBearerToken = {
  onDecodeBearerToken: <T = object>(token: string) => T
}
