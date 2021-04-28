import { AppBar, ButtonBase, Toolbar, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { NavbarAccount } from './NavbarAccount'

export function Navbar(): ReactElement {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <ButtonBase component={Link} to={'/'}>
          <Typography color='inherit' variant='h5'>
            Hex Project
          </Typography>
        </ButtonBase>

        <div style={{ flex: 4 }} />

        <div>
          <NavbarAccount />
        </div>
      </Toolbar>
    </AppBar>
  )
}
