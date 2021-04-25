import { errors } from 'faunadb'
import { RequestWithCors } from './checkCors'
import { createError } from './createError'
import { NetworkError } from '@hex/shared'
import FaunaHTTPError = errors.FaunaHTTPError

type ErrorHandler = (error: FaunaHTTPError, req?: RequestWithCors) => Response
type HandlerWithCors = (req: RequestWithCors) => Promise<Response>

function defaultErrorHandler(
  error: FaunaHTTPError,
  req?: RequestWithCors
): Response {
  const errorData = error.requestResult.responseContent.errors[0]

  return createError({ code: NetworkError.DBError, data: errorData }, req)
}

export function wrapFaunaResponse(
  handler: HandlerWithCors,
  errorHandler: ErrorHandler = defaultErrorHandler
): HandlerWithCors {
  return async (req: RequestWithCors) => {
    try {
      return await handler(req)
    } catch (error) {
      return errorHandler(error, req)
    }
  }
}
