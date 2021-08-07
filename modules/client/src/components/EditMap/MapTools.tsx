import { Grid, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { EditMapTool } from '../../game/utils/EditMapState'
import { GraphicsKey } from '../../game/utils/GraphicsData'
import { PlacementTool } from './PlacementTool'

export function MapTools(): ReactElement {
  return (
    <>
      <Typography variant='body2'>Terrain</Typography>
      <Grid container>
        <PlacementTool
          tool={EditMapTool.Plains}
          graphicKey={GraphicsKey.Plains}
        />
        <PlacementTool
          tool={EditMapTool.Forest}
          graphicKey={GraphicsKey.Forest}
        />
      </Grid>
    </>
  )
}
