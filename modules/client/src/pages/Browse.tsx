import React, { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

export function Browse(): ReactElement {
  const search = useLocation().search
  const searchParams = new URLSearchParams(search)

  console.log(searchParams.get('category'))

  return <div>Browse</div>
}
