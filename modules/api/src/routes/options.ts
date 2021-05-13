import { allowed } from '../utils/allowedList'

export function options(req: Request): Response {
  const origin = req.headers.get('origin')

  if (origin == null || !allowed.some(element => element === origin)) {
    return new Response(null, {
      status: 403,
    })
  }

  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}
