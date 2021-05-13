import { RequestError } from '../../../shared'
import { RequestWithCors } from './checkCors'
import { createError } from './createResponse'

const cookieName = 'fauna-token'

export function setTokenHeader(token: string, res: Response): void {
  res.headers.set(
    `Set-Cookie`,
    `${cookieName}=${token}; path=/; Secure; HttpOnly`
  )
  // TODO: Refresh Tokens
}

function getTokenFromCookies(request: Request): string | null {
  const cookieString = request.headers.get('Cookie')

  if (cookieString == null) {
    return null
  }

  let result: string | null = null

  const cookies = cookieString.split(';')
  cookies.some(element => {
    const pair = element.split('=', 2)
    const name = pair[0].trim()
    if (name === cookieName) {
      result = pair[1]
      return true
    }
  })

  return result
}

export interface RequestParsedWithToken extends RequestWithCors {
  token: string | null
}

export function checkToken(req: RequestWithCors): void {
  const withToken = req as RequestParsedWithToken

  withToken.token = getTokenFromCookies(req)
}

export function privateRoute(req: RequestParsedWithToken): Response | void {
  if (req.token == null) {
    return createError(
      {
        code: RequestError.NotSignedIn,
      },
      req
    )
  }
}

export interface RequestWithToken extends RequestWithCors {
  token: string
}
