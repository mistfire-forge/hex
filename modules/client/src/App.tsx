import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'

import { CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSnapshot } from 'valtio'

import { Navbar } from './components/Navbar'
import { PrivateRoute } from './components/PrivateRoute'
import { Spinner } from './components/Spinner'
import { globalState } from './utils/globalState'

// region Loadable Components
const Error = loadable(
  () => import(/* webpackChunkName: "Error" */ './components/ErrorBoundary'),
  {
    resolveComponent: components => components.ErrorBoundary,
  }
)
const Splash = loadable(
  () => import(/* webpackChunkName: "Splash" */ './pages/Splash'),
  {
    resolveComponent: components => components.Splash,
  }
)
const SignIn = loadable(
  () => import(/* webpackChunkName: "SignIn" */ './pages/account/SignIn'),
  {
    resolveComponent: components => components.SignIn,
  }
)
const CreateAccount = loadable(
  () =>
    import(
      /* webpackChunkName: "CreateAccount" */ './pages/account/CreateAccount'
    ),
  {
    resolveComponent: components => components.CreateAccount,
  }
)
const TargetSelection = loadable(
  () =>
    import(/* webpackChunkName: "TargetSelection" */ './pages/TargetSelection'),
  {
    resolveComponent: components => components.TargetSelection,
  }
)
const NotFound = loadable(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'),
  {
    resolveComponent: components => components.NotFound,
  }
)
const Browse = loadable(
  () => import(/* webpackChunkName: "Browse" */ './pages/Browse'),
  {
    resolveComponent: components => components.Browse,
  }
)
const MyMaps = loadable(
  () => import(/* webpackChunkName: "MyMaps" */ './pages/MyMaps'),
  {
    resolveComponent: components => components.MyMaps,
  }
)
const Map = loadable(
  () => import(/* webpackChunkName: "Map" */ './pages/Map'),
  {
    resolveComponent: components => components.Map,
  }
)
// endregion

const useStyles = makeStyles({
  grid: {
    flex: 1,
  },
})

function App(): ReactElement {
  const classes = useStyles()
  const snapshot = useSnapshot(globalState)

  return (
    <>
      <CssBaseline />
      {snapshot.initialized ? (
        <Router>
          <Navbar />

          <div className={classes.grid}>
            <ErrorBoundary FallbackComponent={Error}>
              <Switch>
                <Route exact path='/'>
                  <Splash />
                </Route>

                <Route path='/sign-in'>
                  <SignIn />
                </Route>
                <Route path='/create-account'>
                  <CreateAccount />
                </Route>

                <Route path='/browse'>
                  <Browse />
                </Route>

                <Route path='/map/:id'>
                  <Map />
                </Route>

                <PrivateRoute path='/my-maps'>
                  <MyMaps />
                </PrivateRoute>

                <Route path='/target'>
                  <TargetSelection />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </ErrorBoundary>
          </div>
        </Router>
      ) : (
        <Spinner />
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
