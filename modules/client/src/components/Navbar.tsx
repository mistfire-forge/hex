import React, { ReactElement, useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'

import {
  AppBar,
  ButtonBase,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { LocationSearching, AccountCircle } from '@material-ui/icons'

export function Navbar(): ReactElement {
  //region Menu
  const [anchor, setAnchor] = useState<Element | null>(null)
  const openMenu = (event: MouseEvent): void => {
    setAnchor(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchor(null)
  }
  //endregion

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
          <IconButton color='inherit' component={Link} to='/sign-in'>
            <AccountCircle />
          </IconButton>

          <IconButton color='inherit' onClick={openMenu}>
            <LocationSearching />
          </IconButton>

          <Menu
            id='account-menu'
            anchorEl={anchor}
            getContentAnchorEl={null}
            open={Boolean(anchor)}
            onClose={closeMenu}
            anchorOrigin={{
              vertical: 30,
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem
              onClick={closeMenu}
              component={Link}
              to='/target-selection'
            >
              <ListItemText primary='Target Selection' />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
