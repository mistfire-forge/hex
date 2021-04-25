const allowed = ['http://localhost:2358', 'https://api.hexahedron.io']

export interface RequestWithCors extends Request {
  returnCorsHeaders: {
    'Access-Control-Allow-Origin': string
    'Access-Control-Allow-Headers': string
  }
}

export function checkCors(req: Request): Response | void {
  const origin = req.headers.get('origin')

  if (origin == null || !allowed.some(element => element === origin)) {
    return new Response(
      JSON.stringify({
        error: 'No Origin Header',
      }),
      {
        status: 403,
      }
    )
  }

  ;(req as RequestWithCors).returnCorsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'content-type',
  }
}
