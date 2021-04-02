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

export const targetState = proxy({
  targetName: loadedTarget ?? TargetName.Production,
})

subscribeKey(targetState, 'targetName', (value: string) =>
  localStorage.setItem(targetKey, value)
)

export const getTargetUrl = (): string => {
  return `https://${targetState.targetName}.api.hexahedron.io`
}
