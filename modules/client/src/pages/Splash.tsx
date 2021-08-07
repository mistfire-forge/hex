import { Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

export function Splash(): ReactElement {
  return (
    <>
      <h1>Splash</h1>
      <Typography variant='body1'>
        This site is not constructed with Mobile in mind, in fact it will
        probably not be possible to play without a mouse. Proceed at your
        discretion.
      </Typography>
    </>
  )
}
