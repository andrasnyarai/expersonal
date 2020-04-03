import React, { useRef, useReducer, useCallback } from 'react'
import useResizeObserver from 'use-resize-observer'

import { CanvasWrapper, Canvas, SceneWrapper } from './style'
import { TopController } from './components/TopController'
import { BottomController } from './components/BottomController'
import { SceneHelmet } from './components/SceneHelmet'
import { SET_GENERATION } from './state/actions'
import { reducer, initialState } from './state/reducer'
import { useCanvasContextChange, useSpaceFillingCurveDraw } from './control/hooks'

// reload bug on mobile

// checkboxes -> overlay with fonts and animation
// disallow user select on checkbox texts

// simpleselector: try images for performance in tileCanvas
// remember scroll posisiton >

const windowGlobal = typeof window !== 'undefined' && window
const shouldRenderStackedControls = windowGlobal.innerHeight < 760

export default function LindenmayerSystems() {
  const [resizeRef, width] = useResizeObserver()
  const canvasRef = useRef()

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
          <Canvas ref={canvasRef} height={width > 1 ? width : 600} width={width} />
        </CanvasWrapper>

        <TopController state={state} dispatchGeneration={dispatchGeneration} dispatch={dispatch} />

        <BottomController shouldRenderStackedControls={shouldRenderStackedControls} state={state} dispatch={dispatch} />
      </SceneWrapper>
    </>
  )
}
