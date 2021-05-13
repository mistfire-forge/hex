import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import { getRequest } from './apiCall'

export enum TargetName {
  Edge = 'edge',
  Dev = 'development',
  Staging = 'staging',
  Production = 'main',
}

export interface UserData {
  email: string
  displayName: string
  createdAt: string
}

interface GlobalState {
  target: string
  initialized: boolean
  user: UserData | null
}

const targetKey = 'API-Target'
const loadedTarget = localStorage.getItem(targetKey)

export const globalState = proxy<GlobalState>({
  target: loadedTarget ?? TargetName.Production,
  initialized: false,
  user: null,
})

// Get User on initial load
getRequest('/me')
  .then(res => {
    if (res.success) {
      globalState.user = res.data as UserData
    }
  })
  .catch(error => {
    console.error('Error getting Me', error)
  })
  .finally(() => (globalState.initialized = true))

// NOTE: Unfortunately we need to use *unknown* since <subscribeKey>
//   is unable to differentiate between types with a string key
subscribeKey(globalState, 'target', (value: unknown) =>
  localStorage.setItem(targetKey, value as string)
)
