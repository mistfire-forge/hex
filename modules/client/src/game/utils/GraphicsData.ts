import { TerrainType } from '../../../../shared'

export const TileSize = 64

export const SelectionCursorPadding = 2

export const TerrainGraphics = {
  key: 'Terrain',
  path: 'graphics/tiles.png',
  data: {
    [TerrainType.PLAINS]: {
      frames: [1],
      animKey: 'BG_Plains',
    },
    [TerrainType.FOREST]: {
      frames: [2, 3],
      animKey: 'BG_Forest',
    },
  },
}
