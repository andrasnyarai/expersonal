import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react'
import useResizeObserver from 'use-resize-observer'

import { CanvasWrapper, Canvas, CanvasSkeleton, SceneWrapper } from './style'
import { TopController } from './components/TopController'
import { BottomController } from './components/BottomController'
import { SceneHelmet } from './components/SceneHelmet'
import { SET_GENERATION } from './state/actions'
import { reducer, initialState } from './state/reducer'
import { useCanvasContextChange, useSpaceFillingCurveDraw } from './control/hooks'

const windowGlobal = typeof window !== 'undefined' && window

export default function LindenmayerSystems() {
  const [resizeRef, width] = useResizeObserver()

  const canvasRef = useRef()
  const [shouldRenderStackedControls, setShouldRenderStackedControls] = useState(true) // default to true due to better loading experience

  useEffect(() => {
    if (windowGlobal) {
      setShouldRenderStackedControls(windowGlobal.innerHeight < 760)
    }
  }, [])

  const [state, dispatch] = useReducer(reducer, initialState)

  useCanvasContextChange(width, canvasRef, state.compositeOperation, 'globalCompositeOperation')
  useCanvasContextChange(width, canvasRef, state.lineCaps, 'lineCap')
  useSpaceFillingCurveDraw(width, canvasRef, state)

  const dispatchGeneration = useCallback(generation => dispatch({ type: SET_GENERATION, payload: generation }), [])

  return (
    <>
      <SceneHelmet shouldRenderStackedControls={shouldRenderStackedControls} isDarkMode={state.darkMode} />

      <SceneWrapper>
        <CanvasWrapper ref={resizeRef}>
          <CanvasSkeleton />
          <Canvas ref={canvasRef} height={width} width={width} />
        </CanvasWrapper>

        <TopController
          shouldRenderStackedControls={shouldRenderStackedControls}
          state={state}
          dispatchGeneration={dispatchGeneration}
          dispatch={dispatch}
        />

        <BottomController shouldRenderStackedControls={shouldRenderStackedControls} state={state} dispatch={dispatch} />
      </SceneWrapper>
    </>
  )
}
