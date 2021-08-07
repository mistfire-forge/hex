export const TileSize = 64

export const SelectionCursorPadding = 2

export enum GraphicsKey {
  Plains,
  Forest,
}

type GraphicsDataType = {
  [index in GraphicsKey]: {
    path: string
    key: string
    animKey: string
    width?: number
  }
}
export const GraphicsData: GraphicsDataType = {
  [GraphicsKey.Plains]: {
    path: 'terrain/plains.png',
    key: 'Plains',
    animKey: 'BG_Plains',
  },
  [GraphicsKey.Forest]: {
    path: 'terrain/forest.png',
    key: 'Forest',
    animKey: 'BG_Forest',
  },
}
