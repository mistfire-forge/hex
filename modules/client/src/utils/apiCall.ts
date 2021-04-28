import { globalState, TargetName } from './globalState'

export async function makeApiCall(
  path: string,
  args: Record<string, unknown>
): Promise<Response> {
  const finalPath = path[0] === '/' ? path : '/' + path

  if (globalState.target === TargetName.Edge) {
    return await fetch(`http://localhost:9000${finalPath}`, args)
  }

  return await fetch(
    `https://api.hexahedron.io/${globalState.target}${finalPath}`,
    args
  )
}

export async function postRequest(
  path: string,
  args: Record<string, unknown>
): Promise<Response> {
  return makeApiCall(path, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    ...args,
  })
}
