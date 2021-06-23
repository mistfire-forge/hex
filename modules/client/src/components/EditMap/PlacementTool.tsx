import { Grid, makeStyles } from '@material-ui/core'
import React, { ReactElement, useCallback, useMemo } from 'react'
import Spritesheet from 'react-responsive-spritesheet'
import { useSnapshot } from 'valtio'
import {
  EditMapTool,
  EditMapToolType,
  getEditMapState,
} from '../../game/utils/EditMapState'
import {
  GraphicsData,
  GraphicsKey,
  SelectionCursorPadding,
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
  const classes = useStyles()

  const imagePath = useMemo(
    () => `/assets/graphics/${GraphicsData[graphicKey].path}`,
    []
  )

  const editState = getEditMapState()
  const snapshot = useSnapshot(editState)

  const isCurrentTool = snapshot.tool === tool && snapshot.toolType === toolType

  const onClick = useCallback(() => {
    editState.toolType = toolType
    editState.tool = tool
  }, [])

  return (
    <Grid item xs={3} onClick={onClick}>
      <div className={classes.toolBlockContainer}>
        <Spritesheet
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          className={classes.toolBlock}
          image={imagePath}
          widthFrame={TileSize}
          heightFrame={TileSize}
          steps={1}
          fps={-1}
          direction='forward'
        />
        {isCurrentTool && (
          <img
            className={classes.overlay}
            src='/assets/graphics/cursor.png'
            alt='Selection Cursor'
          />
        )}
      </div>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  toolBlockContainer: {
    position: 'relative',
    display: 'flex',
    margin: 5,
  },
  toolBlock: {
    padding: `${SelectionCursorPadding}px`,
  },
  overlay: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    pointerEvents: 'none',
  },
}))
