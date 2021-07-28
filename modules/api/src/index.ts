import { Router } from 'itty-router'
import { createMap } from './routes/createMap'
import { map } from './routes/map'

import { me } from './routes/me'
import { myMaps } from './routes/myMaps'
import { signIn } from './routes/signIn'
import { createAccount } from './routes/createAccount'
import { options } from './routes/options'
import { updateMap } from './routes/updateMap'
import { checkCors } from './utils/checkCors'
import { checkToken, privateRoute } from './utils/token'

const base = BASE_PATH.length < 1 ? '' : `/${BASE_PATH}`
const router = Router({ base: base })

router.options('*', options)

router.get('*', checkCors, checkToken)
router.post('*', checkCors, checkToken)

router.post('/create-account', createAccount)
router.post('/sign-in', signIn)

router.get('/map/:id', map)

router.get('/me', privateRoute, me)
router.get('/my-maps', privateRoute, myMaps)
router.post('/create-map', privateRoute, createMap)
router.post('/update-map/:id', privateRoute, updateMap)

router.all(
  '*',
  () =>
    new Response('Not Found', {
      status: 404,
    })
)

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle(event.request))
})
