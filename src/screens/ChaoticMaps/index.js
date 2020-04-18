import React, { useRef, useReducer } from 'react'

import { reducer, initialState, SET_FRAME } from './reducer'
import { useChaoticMapsDraw } from './draw'

const dummyPayload = {
  top: 2,
  bottom: -1,

  startLambda: 3.3,
  endLambda: 4.0,
}

// add windowcheck
// zoom & revert
// zoom anim
// mobile size
// canvas dinamic resize
// number indicators
// add to dashboard
// experiment with color n composite operation

// change favicon have an ogimage for index as well!!!

export default function ChaoticMaps() {
  const canvasRef = useRef()

  const [state, dispatch] = useReducer(reducer, initialState)

  useChaoticMapsDraw(canvasRef, state)

  return (
    <div onClick={() => dispatch({ type: SET_FRAME, payload: dummyPayload })}>
      <canvas style={{ outline: 'solid' }} ref={canvasRef} width={1600} height={800} />
    </div>
  )
}
