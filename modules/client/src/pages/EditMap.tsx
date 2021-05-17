import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner'

export function EditMap(): ReactElement {
  const { id } = useParams<{ id: string }>()



  return <Spinner />
}
