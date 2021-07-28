import { createSuccess } from '../utils/createResponse'
import { createClient } from '../utils/faunaClient'
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

    const client = createClient(req.token)

    return createSuccess(
      {
        yo: 'ho',
      },
      req
    )
  }
)
