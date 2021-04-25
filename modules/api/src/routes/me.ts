import { createClient, query as q } from '../utils/faunaClient'

export async function me(): Promise<Response> {
  const client = createClient()

  try {
    const response = await client.query(
      q.Paginate(q.Documents(q.Collection('users')))
    )

    return new Response(
      JSON.stringify({
        response,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
