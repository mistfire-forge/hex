import { values } from 'faunadb'
import { RequestWithCors } from '../utils/checkCors'
import { createSuccess } from '../utils/createResponse'
import { createClient, query as q } from '../utils/faunaClient'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

interface SignInResponse {
  secret: string
  instance: values.Ref
}

export const signIn = wrapFaunaResponse(
  async (req: RequestWithCors): Promise<Response> => {
    const reqBody = await req.json()
    const client = createClient()

    const response: SignInResponse = await client.query(
      q.Login(q.Match(q.Index('user-by-email'), reqBody.email), {
        password: reqBody.password,
      })
    )

    const userData = await client.query(q.Get(response.instance))

    return createSuccess(
      {
        response: response,
        user: userData,
        token: response.secret,
      },
      req
    )
  }
)
