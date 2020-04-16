import React, { useRef, useReducer } from 'react'

import { reducer, initialState, SET_FRAME } from './reducer'
import { useBifurcationDraw } from './draw'

const dummyPayload = {
  top: 2,
  bottom: -1,

  startLambda: 3.3,
  endLambda: 4.0,
}

// https://en.wikipedia.org/wiki/Tinkerbell_map
// https://robert-doerner.de/en/Henon_system/henon_system.html
// https://en.wikipedia.org/wiki/Ikeda_map

// add windowcheck
// zoom & revert
// zoom anim
// mobile size
// canvas dinamic resize
// number indicators
// add to dashboard
// experiment with color n composite operation

export default function BifurcationDiagram() {
  const canvasRef = useRef()

  const [state, dispatch] = useReducer(reducer, initialState)

  useBifurcationDraw(canvasRef, state)

  return (
    <div onClick={() => dispatch({ type: SET_FRAME, payload: dummyPayload })}>
      <canvas style={{ outline: 'solid' }} ref={canvasRef} width={1600} height={800} />
    </div>
  )
}
