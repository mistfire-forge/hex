import React, { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { EditMapDisplay } from '../components/EditMap/EditMapDisplay'
import { Spinner } from '../components/Spinner'
import { editMapState, resetEditMapState } from '../game/utils/EditMapState'
import { getRequest } from '../utils/apiCall'
import { MapResponse } from './Map'

export function EditMap(): ReactElement {
  const { id } = useParams<{ id: string }>()

  const snapshot = useSnapshot(editMapState)

  useEffect(() => {
    async function getMap() {
      const response = await getRequest(`/map/${id}`)

      if (!response.success) {
        console.error(response.error)

        // TODO: Deal with error

        return
      }

      const mapResponse = response as MapResponse

      editMapState.id = id
      editMapState.map = mapResponse.data.data
    }

    getMap().catch(err => console.error('Error getting map', err))

    return () => {
      resetEditMapState()
    }
  }, [id])

  if (snapshot.map == null) {
    return <Spinner />
  }

  return <EditMapDisplay />
}
