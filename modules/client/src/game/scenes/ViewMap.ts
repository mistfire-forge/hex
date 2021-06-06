import Phaser, { Scene } from 'phaser'
import { GameMap } from '../utils/GameMap'

export class ViewMap extends Scene {
  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config)
  }

  public create(): void {
    this.setupMap()
  }

  private setupMap(): void {
    const terrain = Array.from(Array(20), () => Array(20))
    for (const column of terrain) {
      for (let i = 0; i < column.length; ++i) {
        column[i] = Math.round(Math.random())
      }
    }

    const gameMap = new GameMap(
      {
        name: 'Test Map',
        placement: {
          size: {
            width: 20,
            height: 20,
          },
          terrain: terrain,
        },
      },
      this
    )
  }
}

export const ViewMapKey = 'View Map'
