import { Grid, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { PlacementTool } from './PlacementTool'

export function MapTools(): ReactElement {
  return (
    <>
      <Typography variant='body2'>Terrain</Typography>
      <Grid container>
        <PlacementTool />
      </Grid>
    </>
  )
}
