import { RequestError } from '../../../shared'
import { createError, createSuccess } from '../utils/createResponse'
import {
  createClient,
  createServerClient,
  query as q,
} from '../utils/faunaClient'
import { RequestParsedWithToken } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

interface MapRequest extends RequestParsedWithToken {
  params: {
    id: string
  }
}

interface MapQueryResult {
  ref: {
    '@ref': {
      id: number
    }
  }
  data: {
    published: boolean
  }
}

export const map = wrapFaunaResponse<MapRequest>(
  async (req): Promise<Response> => {
    const { id } = req.params

    if (req.token != null) {
      const client = createClient(req.token)

      return createSuccess(
        await client.query(q.Get(q.Ref(q.Collection('maps'), `${id}`))),
        req
      )
    } else {
      const client = createServerClient()

      // Manual checks

      const mapResponse = await client.query<MapQueryResult>(
        q.Get(q.Ref(q.Collection('maps'), `${id}`))
      )

      if (mapResponse.data.published) {
        return createSuccess(mapResponse, req)
      }

      return createError({
        code: RequestError.NotSignedIn,
      })
    }
  }
)
