import { proxy } from 'valtio'
import { devtools, subscribeKey } from 'valtio/utils'
import { Client, query as q, values } from 'faunadb'

export enum TargetName {
  Edge = 'edge',
  Dev = 'development',
  Staging = 'staging',
  Production = 'main',
}

interface UserData {
  email: string
  displayName: string
  createdAt: values.FaunaDate
}

interface GlobalState {
  target: string
  authToken: string | null
  client: Client | null
  user: UserData | null
}

const targetKey = 'API-Target'
const loadedTarget = localStorage.getItem(targetKey)

const authKey = 'Hex-Auth-Token'
const loadedToken = localStorage.getItem(authKey)

let client: Client | null = null
if (loadedToken != null) {
  client = new Client({ secret: loadedToken })
}

export const globalState = proxy<GlobalState>({
  target: loadedTarget ?? TargetName.Production,
  authToken: loadedToken ?? null,
  client,
  user: null,
})

if (client != null) {
  client.query(q.Get(q.CurrentIdentity())).then(res => {
    globalState.user = (res as { data: UserData }).data
  })
}

// NOTE: Unfortunately we need to use *any* since <subscribeKey>
//   is unable to differentiate between types with a string key
subscribeKey(globalState, 'target', (value: any) =>
  localStorage.setItem(targetKey, value)
)

subscribeKey(globalState, 'authToken', (value: any) => {
  if (globalState.authToken) {
    localStorage.setItem(authKey, value)
    globalState.client = new Client({ secret: value })
  } else {
    localStorage.removeItem(authKey)
    globalState.client = null
  }
})
