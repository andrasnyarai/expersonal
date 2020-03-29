import React, { useRef, useReducer, useCallback } from 'react'
import useResizeObserver from 'use-resize-observer'
import Helmet from 'react-helmet'

import curves from './control/spaceFillingCurves'
import Slider from '../../globalComponents/Slider'
import { CanvasWrapper, Canvas } from './style'
import { reducer, initialState } from './state/reducer'
import {
  SET_CURVE,
  SET_GENERATION,
  SET_GRADIENT_NAME,
  SET_LINE_WIDTH_STYLE,
  SET_COMPOSITE_OPERATION,
  SET_LINE_CAPS,
  SET_CLEAR_BEFORE_DRAW,
  SET_CLEAR_REMAINING_ANIMATIONS,
  SET_DRAW_FULL,
} from './state/actions'
import { gradientNames, compositeOperations, lineCaps, lineWidthStyleMap } from './control/constants'

import { useCanvasContextChange, useSpaceFillingCurveDraw } from './control/hooks'
// import { SimpleSelector } from './components/SimpleSelector'

// -messenger selector
// -layout tablet desktop
// -loading indicator

export default function LindenmayerSystems() {
  const [resizeRef, width] = useResizeObserver()
  const canvasRef = useRef()

  const [state, dispatch] = useReducer(reducer, initialState)

  useCanvasContextChange(width, canvasRef, state.graphicOptions.compositeOperation, 'globalCompositeOperation')
  useCanvasContextChange(width, canvasRef, state.graphicOptions.lineCaps, 'lineCap')

  useSpaceFillingCurveDraw(width, canvasRef, state)

  const dispatchPosition = useCallback(position => dispatch({ type: SET_GENERATION, payload: position }), [])

  return (
    <>
      <Helmet
        style={[
          {
            cssText: `
            html, body {
              margin: 0;
              height: 100%;
              width: 100%;
              position: fixed;
              overflow: hidden;
            }`,
          },
        ]}
      />
      <CanvasWrapper ref={resizeRef}>
        <Canvas ref={canvasRef} height={width} width={width} />
      </CanvasWrapper>
      <Slider
        compact
        current={state.generation}
        cb={dispatchPosition}
        maxRange={state.curve.maxGeneration}
        entityName={state.curveName}
      />

      <select
        onChange={e => {
          const curveName = e.target.value
          dispatch({ type: SET_CURVE, payload: curveName })
        }}
      >
        {Object.keys(curves).map(curve => (
          <option key={curve}>{curve}</option>
        ))}
      </select>
      <select
        onChange={e => {
          dispatch({ type: SET_COMPOSITE_OPERATION, payload: e.target.value })
        }}
      >
        {compositeOperations.map(operation => (
          <option key={operation}>{operation}</option>
        ))}
      </select>
      <select
        onChange={e => {
          dispatch({ type: SET_LINE_CAPS, payload: e.target.value })
        }}
      >
        {lineCaps.map(lineCap => (
          <option key={lineCap}>{lineCap}</option>
        ))}
      </select>
      <select
        onChange={e => {
          dispatch({ type: SET_GRADIENT_NAME, payload: e.target.value })
        }}
      >
        {gradientNames.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        onChange={e => {
          dispatch({ type: SET_LINE_WIDTH_STYLE, payload: e.target.value })
        }}
      >
        {Object.keys(lineWidthStyleMap).map(l => (
          <option key={l}>{l}</option>
        ))}
      </select>
      <input
        type="checkbox"
        checked={state.graphicOptions.clearBeforeDraw}
        onChange={e => {
          dispatch({ type: SET_CLEAR_BEFORE_DRAW, payload: e.target.checked })
        }}
      />
      <input
        type="checkbox"
        checked={state.graphicOptions.clearRemainingAnimations}
        onChange={e => {
          dispatch({ type: SET_CLEAR_REMAINING_ANIMATIONS, payload: e.target.checked })
        }}
      />
      <input
        type="checkbox"
        checked={state.graphicOptions.drawFull}
        onChange={e => {
          dispatch({ type: SET_DRAW_FULL, payload: e.target.checked })
        }}
      />
    </>
  )
}
