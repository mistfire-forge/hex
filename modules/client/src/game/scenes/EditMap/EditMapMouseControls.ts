import Phaser, { Scene } from 'phaser'
import { TileSize } from '../../utils/GraphicsData'

type Camera = Phaser.Cameras.Scene2D.Camera
type Vector2 = Phaser.Math.Vector2
const { Vector2 } = Phaser.Math

export enum EditMapMouseEventType {
  Pan = 'Pan',
  Select = 'Select',
  Zoom = 'Zoom',
  Hover = 'Hover',
}

export class EditMapMouseControls extends Phaser.Events.EventEmitter {
  private mainCamera: Camera

  private isPanning = false
  private previousPan: Vector2 | null = null

  private currentHover: Vector2 | null = null
  private currentSelection: Vector2 | null = null

  constructor(scene: Phaser.Scene, mainCamera: Camera) {
    super()

    scene.input.mouse.disableContextMenu()

    const input = scene.input
    input.on(Phaser.Input.Events.POINTER_DOWN, this.pointerDown)
    input.on(Phaser.Input.Events.POINTER_UP, this.pointerUp)
    input.on(Phaser.Input.Events.POINTER_MOVE, this.pointerMove)

    this.mainCamera = mainCamera
  }

  private pointerDown = (event: PointerEvent): void => {
    switch (event.button) {
      case 0:
        const currentTile = this.findTileCoordinate(event.x, event.y)

        this.currentSelection = currentTile
        this.emit(EditMapMouseEventType.Select, currentTile)

        break
      case 2:
        this.isPanning = true
        this.previousPan = new Vector2(event.x, event.y)

        this.clearHover()

        break
    }
  }

  private pointerUp = (event: PointerEvent): void => {
    switch (event.button) {
      case 0:
        this.currentSelection = null
        break
      case 2:
        this.isPanning = false
        this.previousPan = null

        this.calculateHover(event)

        break
    }
  }

  private pointerMove = (event: PointerEvent): void => {
    if (this.isPanning) {
      if (this.previousPan == null) {
        console.error('Pan Move while Pan Start is null')
        return
      }
      this.emit(
        EditMapMouseEventType.Pan,
        event.x - this.previousPan.x,
        event.y - this.previousPan.y
      )
      this.previousPan = new Vector2(event.x, event.y)
    } else {
      this.calculateHover(event)
    }
  }

  private calculateHover(event: PointerEvent): void {
    const currentCoordinate = this.findTileCoordinate(event.x, event.y)

    if (
      this.currentHover == null ||
      this.currentHover.x !== currentCoordinate.x ||
      this.currentHover.y !== currentCoordinate.y
    ) {
      this.emit(EditMapMouseEventType.Hover, currentCoordinate)
      this.currentHover = currentCoordinate
    }

    if (this.currentSelection !== null) {
      if (
        this.currentSelection.x !== currentCoordinate.x ||
        this.currentSelection.y !== currentCoordinate.y
      ) {
        this.emit(EditMapMouseEventType.Select, currentCoordinate)
        this.currentSelection = currentCoordinate
      }
    }
  }

  private clearHover(): void {
    this.emit(EditMapMouseEventType.Hover, null)
    this.currentHover = null
  }

  private findTileCoordinate = (x: number, y: number) => {
    const worldPoint = this.mainCamera.getWorldPoint(x, y)

    return new Vector2(
      Math.floor(worldPoint.x / TileSize),
      Math.floor(worldPoint.y / TileSize)
    )
  }
}
