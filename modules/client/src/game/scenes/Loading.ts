import Phaser from 'phaser'

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
  }
}
