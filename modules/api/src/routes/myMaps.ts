import { values } from 'faunadb'
import { createSuccess } from '../utils/createResponse'
import { createClient, query as q } from '../utils/faunaClient'
import { RequestWithToken } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'
import Ref = values.Ref

interface MapQueryResults {
  data: [
    number, // TS
    string, // Map Name
    Ref
  ][]
}

export const myMaps = wrapFaunaResponse<RequestWithToken>(
  async (req): Promise<Response> => {
    const client = createClient(req.token)

    const queryResult: MapQueryResults = await client.query(
      q.Paginate(q.Match('map-list-info-by-creator', q.CurrentIdentity()))
    )

    const results = queryResult.data.map(element => ({
      ts: element[0],
      name: element[1],
      id: element[2].id,
    }))

    return createSuccess(results, req)
  }
)
