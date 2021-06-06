declare module 'react-responsive-spritesheet' {
  import { ReactElement } from 'react'

  interface SpritesheetProps {
    image: string
    widthFrame: number
    heightFrame: number
    steps: number
    fps: number
    direction: 'forward' | 'backward'
  }

  export default function Spritesheet(props: SpritesheetProps): ReactElement
}
