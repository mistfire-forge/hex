import { RequestWithCors } from '../utils/checkCors'
import { createSuccess } from '../utils/createResponse'
import { createClient, query as q } from '../utils/faunaClient'
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
    const client = createClient()

    const response: SignInResponse = await client.query(
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

    return createSuccess(
      {
        token: response.token.secret,
        user: response.user,
      },
      req
    )
  }
)
