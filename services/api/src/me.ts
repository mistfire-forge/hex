export function me() {
  return new Response(
    JSON.stringify({
      message: 'This is me!',
      key: FAUNA_ACCESS_KEY,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
  )
}
