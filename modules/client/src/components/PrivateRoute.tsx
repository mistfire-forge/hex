import React, { PropsWithChildren, ReactElement } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { globalState } from '../utils/globalState'

interface PrivateRouteProps {
  path: string
}
export function PrivateRoute(
  props: PropsWithChildren<PrivateRouteProps>
): ReactElement {
  const snapshot = useSnapshot(globalState)
  const location = useLocation()

  if (snapshot.authToken == null) {
    return <Redirect to={{ pathname: '/sign-in', state: { from: location } }} />
  }
  return <Route {...props} />
}
