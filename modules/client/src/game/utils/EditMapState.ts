import { proxy } from 'valtio'
import { MapData } from '../../../../shared'

export enum EditMapTool {
  Plains,
  Forest,
}

interface EditMapState {
  id: string
  map: MapData
  tool?: EditMapTool
}

let editMapState: EditMapState | null = null

export function getEditMapState(): EditMapState {
  if (editMapState == null) {
    throw new Error('Accessing Edit Map State before initializing')
  }
  return editMapState
}

export function initNewEditMapState(data: EditMapState): void {
  editMapState = proxy<EditMapState>(data)
}

export function resetEditMapState(): void {
  editMapState = null
}
