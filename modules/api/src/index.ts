import { Router } from 'itty-router'

import { me } from './routes/me'
import { signIn } from './routes/signIn'
import { createAccount } from './routes/createAccount'
import { options } from './routes/options'
import { checkCors } from './utils/checkCors'

const base = BASE_PATH.length < 1 ? '' : `/${BASE_PATH}`
const router = Router({ base: base })

router.options('*', options)

router.get('*', checkCors)
router.post('*', checkCors)

router.get('/me', me)
router.post('/create-account', createAccount)
router.post('/sign-in', signIn)

router.all('*', () => new Response('Not Found', { status: 404 }))

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle(event.request))
})
