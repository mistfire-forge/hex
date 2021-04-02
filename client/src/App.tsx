import React, { FC, ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { CssBaseline } from '@material-ui/core'

import { Navbar } from './components/Navbar'
import { Splash } from './pages/Splash'
import { TargetSelection } from './pages/TargetSelection'

const App: FC = (): ReactElement => {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Navbar />

        <Switch>
          <Route path='/target-selection'>
            <TargetSelection />
          </Route>
          <Route path='/'>
            <Splash />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
