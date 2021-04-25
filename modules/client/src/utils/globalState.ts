import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import { Client } from 'faunadb'

export enum TargetName {
  Edge = 'edge',
  Dev = 'development',
  Staging = 'staging',
  Production = 'main',
}

const targetKey = 'API-Target'
const loadedTarget = localStorage.getItem(targetKey)

const authKey = 'Fauna-Auth-Token'
const loadedToken = localStorage.getItem(authKey)

let client: Client | null = null
if (loadedToken != null) {
  client = new Client({ secret: loadedToken })
}

export const globalState = proxy({
  target: loadedTarget ?? TargetName.Production,
  authToken: loadedToken ?? null,
  client,
})

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
