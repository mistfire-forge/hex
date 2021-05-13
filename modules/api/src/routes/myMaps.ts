import { createSuccess } from '../utils/createResponse'
import { createClient, query as q } from '../utils/faunaClient'
import { RequestWithToken } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

interface MapQueryResults {
  data: [
    number, // TS
    string // Map Name
  ][]
}

export const myMaps = wrapFaunaResponse<RequestWithToken>(
  async (req): Promise<Response> => {
    const client = createClient(req.token)

    const queryResult: MapQueryResults = await client.query(
      q.Paginate(q.Match('map-list-info-by-creator', q.CurrentIdentity()))
    )

    return createSuccess(queryResult.data, req)
  }
)
