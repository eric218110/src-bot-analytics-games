import { DecodeBearerToken } from '@domain/useCases/api/security/token/decode'
import { DecoderToken } from '@data/useCases/api/token/decoder'
import { SecurityTokenProvider } from '@infra/security/token/provider'

export const makeSecurityTokenDecoder = (): DecodeBearerToken =>
  new DecoderToken(new SecurityTokenProvider())
