import Phaser from 'phaser'
import { GraphicsData, TileSize } from '../utils/GraphicsData'

interface LoadingSceneData {
  nextSceneKey: string
  // TODO: Next Scene Data
}
export class LoadingScene extends Phaser.Scene {
  private sceneData!: LoadingSceneData

  public init(sceneData: LoadingSceneData): void {
    this.sceneData = sceneData
  }

  public async preload(): Promise<void> {
    this.load.setBaseURL('/assets/graphics')

    this.loadSpritesheets()
    this.load.image('cursor', 'cursor.png')

    // TODO: Load other stuff
  }

  public create(): void {
    this.loadTerrainAnimations()

    this.scene.start(this.sceneData.nextSceneKey)
  }

  private loadSpritesheets(): void {
    for (const data of Object.values(GraphicsData)) {
      this.load.spritesheet({
        key: data.key,
        url: data.path,
        frameConfig: {
          frameWidth: data.width ?? TileSize,
        },
      })
    }
  }

  private loadTerrainAnimations() {
    for (const data of Object.values(GraphicsData)) {
      this.anims.create({
        key: data.animKey,
        frames: data.key,
        frameRate: 2,
        repeat: -1,
      })
    }
  }
}

export const LoadingKey = 'Loading'
