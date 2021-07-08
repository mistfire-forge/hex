import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { EditMapDisplay } from '../components/EditMap/EditMapDisplay'
import { Spinner } from '../components/Spinner'
import {
  initNewEditMapState,
  resetEditMapState,
} from '../game/utils/EditMapState'
import { getRequest } from '../utils/apiCall'
import { MapResponse } from './Map'

export function EditMap(): ReactElement {
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getMap() {
      setIsLoading(true)

      const response = await getRequest(`/map/${id}`)

      if (!response.success) {
        console.error(response.error)

        // TODO: Deal with error

        return
      }

      const mapResponse = response as MapResponse

      initNewEditMapState({
        id,
        map: mapResponse.data.data,
      })

      setIsLoading(false)
    }

    getMap().catch(err => console.error('Error getting map', err))

    return () => {
      resetEditMapState()
    }
  }, [id])

  if (isLoading) {
    return <Spinner />
  }

  return <EditMapDisplay />
}
