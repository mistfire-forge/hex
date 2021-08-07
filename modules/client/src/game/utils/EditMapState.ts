import { proxy, subscribe } from 'valtio'
import { debounce } from '@material-ui/core'

import { MapData } from '../../../../shared'
import { postRequest } from '../../utils/apiCall'

export enum EditMapTool {
  Plains,
  Forest,
}

export enum EditMapSaveStatus {
  Saved,
  NotSaved,
  Saving,
  Error,
}

interface EditMapState {
  id: string
  map: MapData
  tool?: EditMapTool

  saveStatus: EditMapSaveStatus
}

let editMapState: EditMapState | null = null

export function getEditMapState(): EditMapState {
  if (editMapState == null) {
    throw new Error('Accessing Edit Map State before initializing')
  }
  return editMapState
}

interface InitArgs {
  id: string
  map: MapData
}

export function initNewEditMapState({ id, map }: InitArgs): void {
  editMapState = proxy<EditMapState>({
    id,
    map,
    saveStatus: EditMapSaveStatus.Saved,
  })

  subscribe(editMapState.map, mapChangeHandler)
}

export function resetEditMapState(): void {
  editMapState = null
}

function mapChangeHandler() {
  const state = getEditMapState()

  state.saveStatus = EditMapSaveStatus.NotSaved

  saveMapDebounced()
}

const saveMapDebounced = debounce(async () => {
  const state = getEditMapState()
  state.saveStatus = EditMapSaveStatus.Saving

  try {
    const result = await postRequest(`/update-map/${state.id}`, {
      body: JSON.stringify(state.map.placement),
    })

    if (result.success) {
      if (state.saveStatus === EditMapSaveStatus.Saving) {
        state.saveStatus = EditMapSaveStatus.Saved
      }
    } else {
      console.error('Something went wrong', result)

      state.saveStatus = EditMapSaveStatus.Error
    }
  } catch (error) {
    console.error(error)
  }
}, 1000)
