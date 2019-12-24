import React, { useRef, useReducer, useState, useCallback } from 'react'
import useResizeObserver from 'use-resize-observer'
import Helmet from 'react-helmet'

import curves from './control/spaceFillingCurves'
import Slider from '../../globalComponents/Slider'
import { CanvasWrapper, Canvas } from './style'
import { reducer, initialState } from './state/reducer'
import { SET_GENERATION, SET_CURVE } from './state/actions'
import { gradientNames, compositeOperations, lineCaps } from './control/constants'
import { lineWidthStyleMap } from './control/constants'
import { useCanvasContextChange, useSpaceFillingCurveDraw } from './control/hooks'

export default function LindenmayerSystems() {
  const [resizeRef, width] = useResizeObserver()
  const canvasRef = useRef()

  const [state, dispatch] = useReducer(reducer, initialState)

  const selectedGradientNameRef = useRef(gradientNames[0])
  const selectedLineWidthStyleRef = useRef(Object.keys(lineWidthStyleMap)[0])
  const [operation, setOperation] = useState(compositeOperations[0])
  const [lineCap, setLineCap] = useState(lineCaps[0])

  const [clearBeforeDraw, setClearBeforeDraw] = useState(true)
  const [clearRemainingTimeouts, setClearRemainingTimeouts] = useState(true)
  const [drawFull, setDrawFull] = useState(true)

  useCanvasContextChange(width, canvasRef, operation, 'globalCompositeOperation')
  useCanvasContextChange(width, canvasRef, lineCap, 'lineCap')

  useSpaceFillingCurveDraw(
    width,
    canvasRef,
    state,
    clearBeforeDraw,
    drawFull,
    clearRemainingTimeouts,
    selectedGradientNameRef,
    selectedLineWidthStyleRef
  )

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
        compact={true}
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
          const operation = e.target.value
          setOperation(operation)
        }}
      >
        {compositeOperations.map(operation => (
          <option key={operation}>{operation}</option>
        ))}
      </select>
      <select
        onChange={e => {
          const lineCap = e.target.value
          setLineCap(lineCap)
        }}
      >
        {lineCaps.map(lineCap => (
          <option key={lineCap}>{lineCap}</option>
        ))}
      </select>
      <select
        onChange={e => {
          selectedGradientNameRef.current = e.target.value
        }}
      >
        {gradientNames.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        onChange={e => {
          selectedLineWidthStyleRef.current = e.target.value
        }}
      >
        {Object.keys(lineWidthStyleMap).map(l => (
          <option key={l}>{l}</option>
        ))}
      </select>
      <input
        type="checkbox"
        checked={clearBeforeDraw}
        onChange={e => {
          setClearBeforeDraw(e.target.checked)
        }}
      />
      <input
        type="checkbox"
        checked={clearRemainingTimeouts}
        onChange={e => {
          setClearRemainingTimeouts(e.target.checked)
        }}
      />
      <input
        type="checkbox"
        checked={drawFull}
        onChange={e => {
          setDrawFull(e.target.checked)
        }}
      />
    </>
  )
}
