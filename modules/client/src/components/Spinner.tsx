import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

const useStyles = makeStyles({
  spinner: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export function Spinner(): ReactElement {
  const classes = useStyles()
  return (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  )
}
