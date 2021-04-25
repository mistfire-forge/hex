import { createClient, query as q } from '../utils/faunaClient'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'
import { Expr } from 'faunadb'
import { RequestWithCors } from '../utils/checkCors'
import { createError } from '../utils/createError'
import { NetworkError } from '@hex/shared'

const client = createClient()

interface CreateResponse {
  ref: Expr
  secret: string
}

export const createAccount = wrapFaunaResponse(async (req: RequestWithCors) => {
  const reqBody = await req.json()

  if (!reqBody.password || !reqBody.email || !reqBody.displayName) {
    return createError({ code: NetworkError.NoData })
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
            },
          })
        ),
      },
      q.Do(q.Create(q.Tokens(), { instance: q.Var('ref') }))
    )
  )

  return new Response(
    JSON.stringify({
      secret: response.secret,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        ...req.returnCorsHeaders,
      },
    }
  )
})
