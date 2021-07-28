import Phaser, { Scene } from 'phaser'
import { TerrainType } from '../../../../../shared'
import {
  EditMapTool,
  EditMapToolType,
  getEditMapState,
} from '../../utils/EditMapState'
import { GraphicsKey, TileSize } from '../../utils/GraphicsData'
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

  private terrainTiles!: TerrainTile[][]
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

    this.terrainTiles = []

    for (let x = 0; x < placement.terrain.length; ++x) {
      this.terrainTiles[x] = []
      for (let y = 0; y < placement.terrain[x].length; ++y) {
        this.terrainTiles[x][y] = new TerrainTile(
          this,
          x,
          y,
          (placement.terrain[x][y] as unknown) as GraphicsKey
        )
      }
    }
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

    mouseControl.addListener(
      EditMapMouseEventType.Select,
      (coordinate: Vector2) => {
        const state = getEditMapState()

        if (state.toolType == null || state.tool == null) {
          return
        }

        if (state.toolType == EditMapToolType.Terrain) {
          const placement = getEditMapState().map.placement
          placement.terrain[coordinate.x][coordinate.y] = TerrainType.Forest

          this.terrainTiles[coordinate.x][coordinate.y].setGraphic(
            getGraphicKeyForTerrain(state.tool)
          )
        }
      }
    )
  }
}

// TODO
interface TypeFromTool {
  terrain?: {
    type: TerrainType
    graphic: GraphicsKey
  }
  // structure?:
  // unit?:
}

// TODO
function getTypeForTool(mapTool: EditMapTool): TypeFromTool | null {
  switch (mapTool) {
    case EditMapTool.Plains:
      return {
        terrain: {
          type: TerrainType.Plains,
          graphic: GraphicsKey.Plains,
        },
      }
  }

  return null
}

// TODO
function getGraphicKeyForTerrain(terrain: EditMapTool): GraphicsKey {
  switch (terrain) {
    case EditMapTool.Plains:
      return GraphicsKey.Plains
    case EditMapTool.Forest:
      return GraphicsKey.Forest
  }
}

export const EditMapKey = 'Edit Map'
