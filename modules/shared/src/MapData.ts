export interface MapData {
  name: string
  placement: {
    size: {
      width: number
      height: number
    }
    terrain: number[][] // X, Y
  }
}

export enum TerrainType {
  PLAINS,
  FOREST,
}
