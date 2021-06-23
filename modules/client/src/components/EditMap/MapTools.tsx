import { Grid, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { EditMapTool, EditMapToolType } from '../../game/utils/EditMapState'
import { GraphicsKey } from '../../game/utils/GraphicsData'
import { PlacementTool } from './PlacementTool'

export function MapTools(): ReactElement {
  return (
    <>
      <Typography variant='body2'>Terrain</Typography>
      <Grid container>
        <PlacementTool
          toolType={EditMapToolType.Terrain}
          tool={EditMapTool.Plains}
          graphicKey={GraphicsKey.Plains}
        />
        <PlacementTool
          toolType={EditMapToolType.Terrain}
          tool={EditMapTool.Forest}
          graphicKey={GraphicsKey.Forest}
        />
      </Grid>
    </>
  )
}
