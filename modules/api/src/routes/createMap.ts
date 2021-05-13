import { createSuccess } from '../utils/createResponse'
import { createClient, query as q } from '../utils/faunaClient'
import { RequestWithToken } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

export const createMap = wrapFaunaResponse<RequestWithToken>(
  async (req: RequestWithToken): Promise<Response> => {
    const client = createClient(req.token)
    const reqBody = await req.json()

    const queryResult = await client.query(q.Call('create-map'), reqBody.name)

    return createSuccess(
      {
        result: queryResult,
      },
      req
    )
  }
)
