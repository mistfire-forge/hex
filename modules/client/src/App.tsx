import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'

import { CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Navbar } from './components/Navbar'

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
// endregion

const useStyles = makeStyles({
  grid: {
    flex: 1,
    display: 'grid',
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
            <Route path='/sign-in'>
              <SignIn />
            </Route>
            <Route path='/create-account'>
              <CreateAccount />
            </Route>
            <Route path='/target'>
              <TargetSelection />
            </Route>
            <Route exact path='/'>
              <Splash />
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
