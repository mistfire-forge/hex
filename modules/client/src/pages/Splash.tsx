import React, { ReactElement } from 'react'
import { useSnapshot } from 'valtio'
import { globalState } from '../utils/globalState'

export function Splash(): ReactElement {
  const snapshot = useSnapshot(globalState)
  const printGlobalState = () => {
    console.log(snapshot)
  }

  return (
    <>
      <h1>Splash</h1>
      <button onClick={printGlobalState}>Print Global State</button>
    </>
  )
}
