import { makeStyles } from '@material-ui/core'
import Phaser from 'phaser'
import React, { ReactElement, useEffect, useRef } from 'react'
import { MapData } from '../../../shared'
import { LoadingKey, LoadingScene } from '../game/scenes/Loading'
import { ViewMap, ViewMapKey } from '../game/scenes/ViewMap'

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

interface MapDisplayProps {
  map: MapData
}
export function MapDisplay({ map }: MapDisplayProps): ReactElement {
  const classes = useStyles()
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const engine = new Phaser.Game({
      type: Phaser.AUTO,
      parent: elementRef.current!,
    })

    engine.scene.add(LoadingKey, LoadingScene, false)
    engine.scene.add(ViewMapKey, ViewMap, false)
    engine.scene.start(LoadingKey, {
      nextSceneKey: ViewMapKey,
    })

    return () => {
      engine.destroy(true)
    }
  }, [])

  return (
    <div className={classes.container}>
      <div ref={elementRef} />
    </div>
  )
}
