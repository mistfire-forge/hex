import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapData } from '@hex/shared'
import { Spinner } from '../components/Spinner'

export function Map(): ReactElement {
  const { id } = useParams<{ id: string }>()

  const [map, setMap] = useState<MapData | null>(null)

  useEffect(() => {

  }, [])

  if (map == null) {
    return <Spinner />
  }

  return <div>Map!</div>
}
