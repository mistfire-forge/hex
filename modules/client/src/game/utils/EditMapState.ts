import { proxy } from 'valtio'
import { MapData } from '../../../../shared'

export enum EditMapTool {
  Plains,
  Forest,
}

interface EditMapState {
  id?: string
  map?: MapData
  tool?: EditMapTool
}

export const editMapState = proxy<EditMapState>({})

interface InitializedEditMapState {
  id: string
  map: MapData
}

export const initializedEditMapState = editMapState as InitializedEditMapState

export function resetEditMapState(): void {
  editMapState.id = undefined
  editMapState.map = undefined
}
