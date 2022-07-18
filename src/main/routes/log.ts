export const logRouterPath = (path: string, method: 'GET' | 'POST') => {
  const { ROUTER_APPLICATION_PREFIX = '' } = process.env
  console.log('Router', `[${method}] - [${ROUTER_APPLICATION_PREFIX}${path}]`)
}
