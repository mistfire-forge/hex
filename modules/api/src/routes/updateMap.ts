import { createSuccess } from '../utils/createResponse'
import { createClient, query as q } from '../utils/faunaClient'
import { RequestWithToken } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

interface UpdateRequest extends RequestWithToken {
  params: {
    id: string
  }
}

export const updateMap = wrapFaunaResponse<UpdateRequest>(
  async (req): Promise<Response> => {
    const { id } = req.params
    const reqBody = await req.json()

    const client = createClient(req.token)

    const result = await client.query(
      q.Update(q.Ref(q.Collection('maps'), id), {
        data: {
          placement: reqBody,
        },
      })
    )

    return createSuccess(
      {
        data: result,
        body: reqBody,
      },
      req
    )
  }
)
