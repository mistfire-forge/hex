import { Grid } from '@material-ui/core'
import React, { ReactElement, useCallback, useMemo } from 'react'
import Spritesheet from 'react-responsive-spritesheet'
import {
  EditMapTool,
  EditMapToolType,
  getEditMapState,
} from '../../game/utils/EditMapState'
import {
  GraphicsData,
  GraphicsKey,
  TileSize,
} from '../../game/utils/GraphicsData'

interface PlacementToolProps {
  toolType: EditMapToolType
  tool: EditMapTool
  graphicKey: GraphicsKey
}

export function PlacementTool({
  toolType,
  tool,
  graphicKey,
}: PlacementToolProps): ReactElement {
  const imagePath = useMemo(
    () => `/assets/graphics/${GraphicsData[graphicKey].path}`,
    []
  )

  const onClick = useCallback(() => {
    const state = getEditMapState()

    state.toolType = toolType
    state.tool = tool
  }, [])

  return (
    <Grid item xs={3} onClick={onClick}>
      <Spritesheet
        image={imagePath}
        widthFrame={TileSize}
        heightFrame={TileSize}
        steps={1}
        fps={-1}
        direction='forward'
      />
    </Grid>
  )
}
