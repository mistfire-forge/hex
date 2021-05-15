import { RequestError } from '../../../shared'
import { RequestWithCors } from './checkCors'

export function createSuccess(body?: any, req?: RequestWithCors): Response {
  return createResponse(
    {
      success: true,
      data: body,
    },
    req
  )
}

export function createError(
  body?: { code: RequestError; data?: Record<string, unknown> },
  req?: RequestWithCors
): Response {
  return createResponse(
    {
      success: false,
      error: body,
    },
    req
  )
}

function createResponse(body: any, req?: RequestWithCors): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-credentials': 'true',
      ...req?.returnCorsHeaders,
    },
  })
}
