import { makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { EditMap, EditMapKey } from '../../game/scenes/EditMap/EditMap'
import { LoadingKey, LoadingScene } from '../../game/scenes/Loading'
import { MapTools } from './MapTools'

enum TabState {
  Tools,
  Data,
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  mapRoot: {
    paddingTop: 10,
    marginRight: 10,
    maxWidth: 1280,
    maxHeight: 720,
  },
})

export function EditMapDisplay(): ReactElement {
  const classes = useStyles()
  const [tabState, setTabState] = useState(TabState.Tools)
  const elementRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className={classes.container}>
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
  )
}
