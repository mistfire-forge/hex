import * as Phaser from 'phaser'
import { GraphicsData, GraphicsKey, TileSize } from './GraphicsData'

export class TerrainTile extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, graphic: GraphicsKey) {
    super(scene, x * TileSize, y * TileSize, '')

    this.setOrigin(0, 0)
    this.play(GraphicsData[graphic].animKey)

    scene.add.existing(this)
  }

  public setGraphic(key: GraphicsKey): void {
    this.play(GraphicsData[key].animKey)
  }
}
