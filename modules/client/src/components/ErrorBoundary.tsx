import React, { ReactElement, useEffect, useState } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { useLocation } from 'react-router-dom'

export function ErrorBoundary({
  error,
  resetErrorBoundary,
}: FallbackProps): ReactElement {
  const location = useLocation()
  const [prevPath, setPrevPath] = useState(location.pathname)

  useEffect(() => {
    if (location.pathname !== prevPath) {
      resetErrorBoundary()
    }
    setPrevPath(location.pathname)
  }, [location.pathname])

  // TODO: Better Error Handling

  return (
    <>
      <div>You have hit an error!</div>
      <div>{error.message}</div>
    </>
  )
}
