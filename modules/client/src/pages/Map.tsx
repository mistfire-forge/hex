import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapData } from '@hex/shared'
import { Spinner } from '../components/Spinner'
import { getRequest } from '../utils/apiCall'

export function Map(): ReactElement {
  const { id } = useParams<{ id: string }>()

  const [map, setMap] = useState<MapData | null>(null)

  useEffect(() => {
    async function getMap() {
      const result = await getRequest(`/map/${id}`)

      console.log(result)
    }

    getMap()

    return () => {
      setMap(null)
    }
  }, [id])

  if (map == null) {
    return <Spinner />
  }

  return <div>Map!</div>
}
