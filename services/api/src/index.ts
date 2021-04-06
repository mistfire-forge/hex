addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    new Response(JSON.stringify({ key: fauna_access_key }), { status: 200 })
  )
})
