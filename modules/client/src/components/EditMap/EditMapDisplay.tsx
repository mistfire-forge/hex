import { makeStyles, Tab, Tabs, Typography } from '@material-ui/core'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'
import { EditMap, EditMapKey } from '../../game/scenes/EditMap/EditMap'
import { LoadingKey, LoadingScene } from '../../game/scenes/Loading'
import {
  EditMapSaveStatus,
  getEditMapState,
} from '../../game/utils/EditMapState'
import { MapTools } from './MapTools'

enum TabState {
  Tools,
  Data,
}

export function EditMapDisplay(): ReactElement {
  const classes = useStyles()
  const [tabState, setTabState] = useState(TabState.Tools)
  const elementRef = useRef<HTMLDivElement>(null)

  const mapData = useSnapshot(getEditMapState())

  useEffect(() => {
    const engine = new Phaser.Game({
      type: Phaser.AUTO,
      scale: {
        width: 800,
        height: 600,
      },

      parent: elementRef.current!,
    })

    engine.scene.add(LoadingKey, LoadingScene, true, {
      nextSceneKey: EditMapKey,
    })
    engine.scene.add(EditMapKey, EditMap, false)

    return () => {
      engine.destroy(true)
    }
  }, [])

  let saveStateText
  switch (mapData.saveStatus) {
    case EditMapSaveStatus.NotSaved:
      saveStateText = 'Not Saved'
      break
    case EditMapSaveStatus.Saving:
      saveStateText = 'Saving...'
      break
    case EditMapSaveStatus.Saved:
      // saveStateText = 'Saved!'
      break
  }

  return (
    <div className={classes.container}>
      <div className={classes.nameRow}>
        <Typography variant='h4'>{mapData.map.name}</Typography>
        <div className={classes.spacer} />
        <Typography variant='body2'>{saveStateText}</Typography>
      </div>
      <div className={classes.contentArea}>
        <div ref={elementRef} className={classes.mapRoot} />
        <div>
          <Tabs value={tabState} onChange={(event, val) => setTabState(val)}>
            <Tab label='Tools' />
            <Tab label='Data' />
          </Tabs>
          <div hidden={tabState !== TabState.Tools}>
            <MapTools />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: 30,
  },
  nameRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  contentArea: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  mapRoot: {
    paddingTop: 10,
    marginRight: 10,
    // maxWidth: 1280,
    // maxHeight: 720,
  },
})
