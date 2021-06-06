import * as Phaser from 'phaser'
import { TileSize } from './GraphicsData'

export class TerrainTile extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    animated: boolean,
    handle: string
  ) {
    super(scene, x * TileSize, y * TileSize, animated ? '' : handle)

    this.setOrigin(0, 0)
    if (animated) {
      this.play(handle)
    }

    scene.add.existing(this)
  }
}
