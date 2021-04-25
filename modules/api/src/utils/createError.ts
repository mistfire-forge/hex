import { NetworkError } from '@hex/shared'

import { RequestWithCors } from './checkCors'

export function createError(
  body: { code: NetworkError; data?: Record<string, unknown> },
  req?: RequestWithCors
): Response {
  return new Response(
    JSON.stringify({
      success: false,
      error: body,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        ...req?.returnCorsHeaders,
      },
    }
  )
}
