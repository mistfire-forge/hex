import { RequestError } from '../../../shared'
import { RequestWithCors } from '../utils/checkCors'
import { createError, createSuccess } from '../utils/createResponse'
import { createServerClient, query as q } from '../utils/faunaClient'
import { setTokenHeader } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

interface CreateResponse {
  token: {
    secret: string
  }
  user: Record<string, unknown>
}

export const createAccount = wrapFaunaResponse(async (req: RequestWithCors) => {
  const reqBody = await req.json()

  if (!reqBody.password || !reqBody.email || !reqBody.displayName) {
    return createError({ code: RequestError.NoData })
  }

  const client = createServerClient()

  const queryResult: CreateResponse = await client.query(
    q.Let(
      {
        user: q.Create(q.Collection('users'), {
          credentials: {
            password: reqBody.password,
          },
          data: {
            email: reqBody.email,
            displayName: reqBody.displayName,
            created: q.ToDate(q.Now()),
          },
        }),
        ref: q.Select(['ref'], q.Var('user')),
        token: q.Create(q.Tokens(), {
          instance: q.Var('ref'),
          data: {
            created: q.Now(),
            // TODO: Last Used Location, etc.
          },
        }),
      },
      {
        token: q.Var('token'),
        user: q.Var('user'),
      }
    )
  )

  const response = createSuccess(
    {
      user: queryResult.user,
    },
    req
  )

  setTokenHeader(queryResult.token.secret, response)

  return response
})
