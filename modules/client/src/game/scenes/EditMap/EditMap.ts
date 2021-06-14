import Phaser, { Scene } from 'phaser'
import { TerrainType } from '../../../../../shared'
import { getEditMapState } from '../../utils/EditMapState'
import { TileSize } from '../../utils/GraphicsData'
import { TerrainTile } from '../../utils/TerrainTile'
import {
  EditMapMouseControls,
  EditMapMouseEventType,
} from './EditMapMouseControls'

type Sprite = Phaser.GameObjects.Sprite
type Vector2 = Phaser.Math.Vector2

export class EditMap extends Scene {
  private mainCamera!: Phaser.Cameras.Scene2D.Camera
  private minZoom!: number

  private terrainTiles!: Sprite[][]
  private hoverIdicator!: Sprite

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config)
  }

  public create(): void {
    this.hoverIdicator = this.add.sprite(0, 0, 'cursor')
    this.hoverIdicator.setOrigin(2 / 68, 2 / 68)
    this.hoverIdicator.depth = 1

    this.setupMap()

    this.setupCamera()

    this.setupControls()
  }

  private setupMap(): void {
    const placement = getEditMapState().map.placement

    this.terrainTiles = Array(placement.size.width).fill(
      Array(placement.size.height)
    )

    placement.terrain.forEach((element, x) => {
      element.forEach((terrain: TerrainType, y) => {
        // TODO Properly determine correct sprite
        this.terrainTiles[x][y] = new TerrainTile(this, x, y, true, 'BG_Forest')
      })
    })
  }

  private setupCamera(): void {
    this.mainCamera = this.cameras.main

    const placement = getEditMapState().map.placement

    this.mainCamera.setBounds(
      0,
      0,
      TileSize * placement.size.width,
      TileSize * placement.size.height
    )

    const widthScale = this.mainCamera.width / (placement.size.width * TileSize)
    const heightScale =
      this.mainCamera.height / (placement.size.height * TileSize)

    const minScale = Math.max(widthScale, heightScale)
    this.minZoom = Math.max(minScale, 0.5)
  }

  private setupControls(): void {
    const mouseControl = new EditMapMouseControls(this, this.mainCamera)

    mouseControl.addListener(
      EditMapMouseEventType.Pan,
      (x: number, y: number) => {
        this.mainCamera.setScroll(
          this.mainCamera.scrollX - x,
          this.mainCamera.scrollY - y
        )
      }
    )

    mouseControl.addListener(
      EditMapMouseEventType.Hover,
      (coordinate: Vector2) => {
        if (coordinate == null) {
          this.hoverIdicator.visible = false
          return
        }

        this.hoverIdicator.visible = true
        this.hoverIdicator.setPosition(
          coordinate.x * TileSize,
          coordinate.y * TileSize
        )
      }
    )
  }
}

export const EditMapKey = 'Edit Map'
