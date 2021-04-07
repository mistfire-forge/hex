import { Router } from 'itty-router'

import { me } from './me'

const router = Router()

router.get('/me', me)

router.all('*', () => new Response('Not Found', { status: 404 }))

addEventListener('fetch', (event: FetchEvent) => {
  // event.respondWith(
  //   new Response(JSON.stringify({ key: fauna_access_key }), { status: 200 })
  // )
  event.respondWith(router.handle(event.request))
})
