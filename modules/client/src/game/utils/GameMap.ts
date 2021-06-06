import Phaser from 'phaser'
import { MapData, TerrainType } from '../../../../shared'
import { TerrainTile } from './TerrainTile'

export class GameMap {
  private terrain: number[][]
  private readonly terrainSprites: Phaser.GameObjects.Sprite[][]

  constructor(mapData: MapData, scene: Phaser.Scene) {
    this.terrain = mapData.placement.terrain
    this.terrainSprites = Array(mapData.placement.size.width).fill(
      Array(mapData.placement.size.height)
    )

    mapData.placement.terrain.forEach((element, x) => {
      element.forEach((terrain: TerrainType, y) => {
        this.terrainSprites[x][y] = new TerrainTile(scene, x, y, terrain)
      })
    })
  }
}
