import React, { useRef, useReducer } from 'react'

import { reducer, initialState, SET_MAP, SET_PARAMETER } from './reducer'
import { useChaoticMapsDraw } from './draw'
import useResizeObserver from 'use-resize-observer'
import { usePinchZoom } from './usePinchZoom'

// add windowcheck
// desktop zoom
// mobile size
// canvas dinamic resize
// number indicators
// add to dashboard
// size them properly
// parameter sliders

// if medium screen maxbatchsize

// change favicon have an ogimage for index as well!!!

export default function ChaoticMaps() {
  const [resizeRef, width] = useResizeObserver()
  const canvasRef = useRef()
  const isMediumScreen = window.innerWidth < 800

  const [state, dispatch] = useReducer(reducer, initialState)

  useChaoticMapsDraw(canvasRef, state, width, isMediumScreen)

  const [bind, { pinchTransform, newDimensions }] = usePinchZoom(
    state,
    dispatch,
    width,
    isMediumScreen ? width : width / 2,
  )

  return (
    <>
      <div style={{ touchAction: 'none', overflow: 'hidden', position: 'relative' }} {...bind()} ref={resizeRef}>
        <canvas
          style={{
            transform: `translateX(${pinchTransform.x}px) translateY(${pinchTransform.y}px) scale(${pinchTransform.scale})`,
            outline: 'solid',
          }}
          width={width}
          height={isMediumScreen ? width : width / 2}
          ref={canvasRef}
        />
      </div>
      {JSON.stringify(newDimensions)}
      {['logistic', 'gauss', 'tinkerbell', 'henon', 'ikeda', 'de jong', 'clifford'].map(mapName => (
        <div key={mapName} onClick={() => dispatch({ type: SET_MAP, payload: mapName })}>
          {mapName}
        </div>
      ))}
      {state.parameters &&
        Object.entries(state.parameters).map(([parameterName, value]) => {
          const [min, max] = state.parametersRange[parameterName]
          const step = state.parametersStep
          // memo these
          // debounce throttle
          return (
            <>
              <input
                type="range"
                step={step}
                min={min}
                max={max}
                value={value}
                onChange={e => dispatch({ type: SET_PARAMETER, payload: { [parameterName]: e.target.value } })}
              />
              {value}
            </>
          )
        })}
    </>
  )
}
