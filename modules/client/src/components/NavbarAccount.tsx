import { IconButton, ListItemText, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React, { MouseEvent, ReactElement, useCallback, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { globalState } from '../utils/globalState'

export function NavbarAccount(): ReactElement {
  const snapshot = useSnapshot(globalState)
  const history = useHistory()

  const [anchor, setAnchor] = useState<Element | null>(null)

  const signOut = useCallback(() => {
    globalState.authToken = null
    history.push('/')
    closeMenu()
  }, [])

  const openMenu = (event: MouseEvent): void => {
    setAnchor(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchor(null)
  }

  if (!snapshot.authToken) {
    return (
      <IconButton color='inherit' component={Link} to='/sign-in'>
        <AccountCircle />
      </IconButton>
    )
  }

  return (
    <>
      <IconButton color='inherit' onClick={openMenu}>
        <AccountCircle />
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
        <MenuItem onClick={signOut}>
          <ListItemText primary='Sign Out' />
        </MenuItem>
      </Menu>
    </>
  )
}
