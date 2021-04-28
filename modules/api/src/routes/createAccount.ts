import { createClient, query as q } from '../utils/faunaClient'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'
import { RequestWithCors } from '../utils/checkCors'
import { createError, createSuccess } from '../utils/createResponse'
import { RequestError } from '@hex/shared'

const client = createClient()

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

  const response: CreateResponse = await client.query(
    q.Let(
      {
        ref: q.Select(
          'ref',
          q.Create(q.Collection('users'), {
            credentials: {
              password: reqBody.password,
            },
            data: {
              email: reqBody.email,
              displayName: reqBody.displayName,
              created: q.ToDate(q.Now()),
            },
          })
        ),
        token: q.Create(q.Tokens(), { instance: q.Var('ref') }),
        user: q.Get(q.Var('ref')),
      },
      q.Do({ token: q.Var('token'), user: q.Var('user') })
    )
  )

  return createSuccess(
    {
      user: response.user,
      token: response.token.secret,
    },
    req
  )
})
