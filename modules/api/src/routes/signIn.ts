import { RequestWithCors } from '../utils/checkCors'
import { createSuccess } from '../utils/createResponse'
import { createServerClient, query as q } from '../utils/faunaClient'
import { setTokenHeader } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

interface SignInResponse {
  token: {
    secret: string
  }
  user: Record<string, unknown>
}

export const signIn = wrapFaunaResponse(
  async (req: RequestWithCors): Promise<Response> => {
    const reqBody = await req.json()
    const client = createServerClient()

    const queryResult: SignInResponse = await client.query(
      q.Let(
        {
          user: q.Get(q.Match(q.Index('user-by-email'), reqBody.email)),
          token: q.Login(q.Select(['ref'], q.Var('user')), {
            password: reqBody.password,
            data: {
              created: q.Now(),
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
  }
)
