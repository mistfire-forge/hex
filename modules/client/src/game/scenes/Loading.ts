import Phaser from 'phaser'
import { TerrainGraphics } from '../utils/GraphicsData'

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
    this.load.setBaseURL('/assets')

    this.loadTerrainSheets()
    this.load.image('cursor', 'graphics/cursor.png')
  }

  public create(): void {
    this.loadTerrainAnimations()

    this.scene.start(this.sceneData.nextSceneKey)
  }

  private loadTerrainSheets(): void {
    this.load.spritesheet(TerrainGraphics.key, TerrainGraphics.path, {
      frameWidth: 64,
      frameHeight: 64,
    })
  }

  private loadTerrainAnimations() {
    for (const data of Object.values(TerrainGraphics.data)) {
      this.anims.create({
        key: data.animKey,
        frames: data.frames.map(element => ({
          frame: element,
        })),
        defaultTextureKey: TerrainGraphics.key,
        frameRate: 2,
        repeat: -1,
      })
    }
  }
}

export const LoadingKey = 'Loading'
