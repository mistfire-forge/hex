import { RequestError } from '../../../shared'
import { globalState, TargetName } from './globalState'

export interface APIResponse extends Response {
  success: boolean
  data?: unknown
  error?: {
    code: RequestError
  }
}

export async function makeApiCall(
  path: string,
  args?: RequestInit
): Promise<APIResponse> {
  const finalPath = path[0] === '/' ? path : '/' + path

  let response: Response
  if (globalState.target === TargetName.Edge) {
    response = await fetch(`http://localhost:9000${finalPath}`, {
      credentials: 'include',
      ...args,
    })
  } else {
    response = await fetch(
      `https://api.hexahedron.io/${globalState.target}${finalPath}`,
      {
        credentials: 'same-origin',
        ...args,
      }
    )
  }

  return (await response.json()) as APIResponse
}

export async function postRequest(
  path: string,
  args?: RequestInit
): Promise<APIResponse> {
  return makeApiCall(path, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    ...args,
  })
}

export async function getRequest(
  path: string,
  args?: RequestInit
): Promise<APIResponse> {
  return makeApiCall(path, {
    method: 'GET',
    ...args,
  })
}
