import { FetchHttpClient } from '@infra/http/client/fetch'

export const makeHttpClient = () => new FetchHttpClient()
