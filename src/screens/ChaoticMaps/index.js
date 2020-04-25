import React, { useRef, useReducer, useState } from 'react'
import useResizeObserver from 'use-resize-observer'

import { reducer, initialState } from './reducer'
import { useChaoticMapsDraw } from './draw'
import { usePinchZoom } from './usePinchZoom'
import { Canvas, CanvasWrapper } from './style'
import { SceneHelmet } from './components/SceneHelmet'
import { MapSwitcher } from './components/MapSwitcher'
import { ParameterKnobs } from './components/ParameterKnobs'
import { AlphaCheckbox } from './components/AlphaCheckbox'

const windowGlobal = typeof window !== 'undefined' && window

export default function ChaoticMaps() {
  const [resizeRef, width] = useResizeObserver()
  const canvasRef = useRef()
  const isMediumScreen = windowGlobal && window.innerWidth < 800
  const height = isMediumScreen ? width : width / 2

  const [state, dispatch] = useReducer(reducer, initialState)
  const [shouldPreservePrevious, setShouldPreservePrevious] = useState(false)

  useChaoticMapsDraw(canvasRef, state, width, height, isMediumScreen, shouldPreservePrevious)
  const [bind, { pinchTransform }] = usePinchZoom(state, dispatch, width, isMediumScreen ? width : width / 2)

  return (
    <>
      <SceneHelmet />
      <CanvasWrapper style={{ height: height - 3 }} {...bind()} ref={resizeRef}>
        <Canvas pinchTransform={pinchTransform} width={width} height={height} ref={canvasRef} />
      </CanvasWrapper>

      <MapSwitcher state={state} dispatch={dispatch} />
      <ParameterKnobs state={state} dispatch={dispatch} />
      <AlphaCheckbox
        shouldPreservePrevious={shouldPreservePrevious}
        setShouldPreservePrevious={setShouldPreservePrevious}
      />
    </>
  )
}
