import { createSuccess } from '../utils/createResponse'
import { createClient, query as q } from '../utils/faunaClient'
import { RequestWithToken } from '../utils/token'
import { wrapFaunaResponse } from '../utils/wrapFaunaResponse'

export const me = wrapFaunaResponse<RequestWithToken>(
  async (req): Promise<Response> => {
    const client = createClient(req.token)

    const result = await client.query(q.Get(q.CurrentIdentity()))

    return createSuccess(
      {
        user: result,
      },
      req
    )
  }
)

// export async function me(): Promise<Response> {
//   const token = getTokenFromCookies()
//
//   const client = createClient()
//
//   try {
//     const response = await client.query(
//       q.Paginate(q.Documents(q.Collection('users')))
//     )
//
//     return new Response(
//       JSON.stringify({
//         response,
//       }),
//       {
//         status: 200,
//         headers: {
//           'content-type': 'application/json',
//         },
//       }
//     )
//   } catch (err) {
//     return new Response(JSON.stringify(err), {
//       status: 500,
//       headers: {
//         'content-type': 'application/json',
//       },
//     })
//   }
// }
