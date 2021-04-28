import React, { PropsWithChildren, ReactElement } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { globalState } from '../utils/globalState'

interface PrivateRouteProps {
  location: Location
}
export function PrivateRoute({
  location,
  ...rest
}: PropsWithChildren<PrivateRouteProps>): ReactElement {
  const snapshot = useSnapshot(globalState)
  if (snapshot.authToken == null) {
    return <Redirect to={{ pathname: '/sign-in', state: { from: location } }} />
  }
  return <Route {...rest} />
}
