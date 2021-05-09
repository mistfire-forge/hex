import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

const useStyles = makeStyles(theme => ({
  container: {
    margin: `${theme.spacing(2)}px 0`,
    display: 'flex',
    flexDirection: 'row',
  },
  spacer: {
    flex: 1,
  },
}))

interface TitleBarProps {
  title: string
  endElement?: ReactElement | null
}
export function TitleBar({
  title,
  endElement = null,
}: TitleBarProps): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant='h4'>{title}</Typography>

      <div className={classes.spacer} />

      {endElement}
    </div>
  )
}
