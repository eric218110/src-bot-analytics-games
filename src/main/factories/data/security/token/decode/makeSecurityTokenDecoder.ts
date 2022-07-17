import { DecodeBearerToken } from '@domain/useCases/security/token/decode'
import { DecoderToken } from '@data/useCases/token/decoder'
import { SecurityTokenProvider } from '@infra/security/token/provider'

export const makeSecurityTokenDecoder = (): DecodeBearerToken =>
  new DecoderToken(new SecurityTokenProvider())
