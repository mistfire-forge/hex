import { createClient } from '../utils/faunaClient'

export function signIn(req: Request): Response {
  console.log(req.body)
  return new Response(
    JSON.stringify({
      req: req.body,
    })
  )
}
