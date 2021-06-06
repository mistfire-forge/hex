import { Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'
import Spritesheet from 'react-responsive-spritesheet'
import { TileSize } from '../../game/utils/GraphicsData'

export function PlacementTool(): ReactElement {
  return (
    <Grid item xs={3}>
      <Spritesheet
        image='/assets/graphics/terrain/plains.png'
        widthFrame={TileSize}
        heightFrame={TileSize}
        steps={1}
        fps={-1}
        direction='forward'
      />
    </Grid>
  )
}
