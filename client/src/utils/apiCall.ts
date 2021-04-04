import { networkState } from './networkState'

export async function makeApiCall(path: string, args: Record<string, unknown>) {
  return await fetch(`${networkState.target}.api.hexahedron.io/${path}`, args)
}
