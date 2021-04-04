import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'

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

export const networkState = proxy({
  target: loadedTarget ?? TargetName.Production,
  authToken: loadedToken ?? null,
})

// NOTE: Unfortunately we need to use *any* since <subscribeKey>
//   is unable to differentiate between types with a string key
subscribeKey(networkState, 'target', (value: any) =>
  localStorage.setItem(targetKey, value)
)

subscribeKey(networkState, 'authToken', (value: any) => {
  if (networkState.authToken) {
    localStorage.setItem(authKey, value)
  } else {
    localStorage.removeItem(authKey)
  }
})
