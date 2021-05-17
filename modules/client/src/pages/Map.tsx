import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapData } from '../../../shared'
import { MapDisplay } from '../components/MapDisplay'
import { Spinner } from '../components/Spinner'
import { FaunaResponse, getRequest } from '../utils/apiCall'

export function Map(): ReactElement {
  const { id } = useParams<{ id: string }>()

  const [map, setMap] = useState<MapData | null>(null)

  useEffect(() => {
    async function getMap() {
      const response = await getRequest(`/map/${id}`)

      if (!response.success) {
        console.error(response.error)

        // TODO: Deal with error

        return
      }

      const mapResponse = response as MapResponse

      setMap(mapResponse.data.data)
    }

    getMap()

    return () => {
      setMap(null)
    }
  }, [id])

  if (map == null) {
    return <Spinner />
  }

  return <MapDisplay map={map} />
}

interface MapResponse extends FaunaResponse {
  data: {
    data: MapData
  }
}
