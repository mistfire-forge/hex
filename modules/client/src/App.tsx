import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'

import { CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Navbar } from './components/Navbar'
import { PrivateRoute } from './components/PrivateRoute'

// region Loadable Components
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
// endregion

const useStyles = makeStyles({
  grid: {
    flex: 1,
  },
})

function App(): ReactElement {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />

        <div className={classes.grid}>
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
        </div>
      </Router>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
