import { createSuccess } from '../utils/createResponse'
import { createClient, query as q } from '../utils/faunaClient'
import { RequestWithToken } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

const defaultMapPlacement = {
  size: {
    width: 20,
    height: 20,
  },
  terrain: Array(20).fill(Array(20).fill(0)),
}

export const createMap = wrapFaunaResponse<RequestWithToken>(
  async (req: RequestWithToken): Promise<Response> => {
    const client = createClient(req.token)
    const reqBody = await req.json()

    const queryResult = await client.query(
      q.Create(q.Collection('maps'), {
        data: {
          creator: q.CurrentIdentity(),
          created: q.ToDate(q.Now()),
          name: reqBody.name,
          placement: defaultMapPlacement,
        },
      })
    )

    return createSuccess(
      {
        result: queryResult,
      },
      req
    )
  }
)
