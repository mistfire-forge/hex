import { errors } from 'faunadb'
import { RequestWithCors } from './checkCors'
import { createError } from './createResponse'
import { RequestError } from '@hex/shared'
import FaunaHTTPError = errors.FaunaHTTPError

type ErrorHandler = (error: FaunaHTTPError, req?: RequestWithCors) => Response
type HandlerFor<T extends RequestWithCors> = (req: T) => Promise<Response>

function defaultErrorHandler(
  error: FaunaHTTPError,
  req?: RequestWithCors
): Response {
  console.log(error)
  const errorData = error.requestResult.responseContent.errors[0]

  return createError({ code: RequestError.DBError, data: errorData }, req)
}

export function wrapFaunaResponse<T extends RequestWithCors>(
  handler: HandlerFor<T>,
  errorHandler: ErrorHandler = defaultErrorHandler
): HandlerFor<T> {
  return async (req: T) => {
    try {
      return await handler(req)
    } catch (error) {
      return errorHandler(error, req)
    }
  }
}
