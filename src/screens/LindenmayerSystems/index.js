import React, { useEffect, useRef, useReducer, useState, useCallback } from 'react'
import useResizeObserver from 'use-resize-observer'

import curves from './control/spaceFillingCurves'
import { CanvasWrapper, Canvas } from './style'
import { reducer, initialState } from './state/reducer'
import { SET_GENERATION, SET_CURVE } from './state/actions'
import { padding, gradientNames, compositeOperations, lineCaps } from './control/constants'
import { drawSegment, calculateCurve, clearCanvas, lineWidthStyleMap } from './logic/utils'
import Helmet from 'react-helmet'
import Slider from '../../globalComponents/Slider'

let selectedGradientName = gradientNames[0]
let selectedLineWidthStyle = 'default'

// fonts: Playfair Display, poppins -- google
// filter down composite operations
// workerize comlink?
// finger selector
// have a loading indicator ?

export default function LindenmayerSystems() {
  const canvasRef = useRef()
  const [resizeRef, width] = useResizeObserver()

  const [state, dispatch] = useReducer(reducer, initialState)

  const [operation, setOperation] = useState(compositeOperations[0])
  const [lineCap, setLineCap] = useState(lineCaps[0])

  const [clearBeforeDraw, setClearBeforeDraw] = useState(true)
  const [clearRemainingTimeouts, setClearRemainingTimeouts] = useState(true)
  const [drawFull, setDrawFull] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (width > 1 && canvas.getContext) {
      const context = canvas.getContext('2d')
      context.globalCompositeOperation = operation
    }
  }, [width, canvasRef, operation])

  useEffect(() => {
    const canvas = canvasRef.current
    if (width > 1 && canvas.getContext) {
      const context = canvas.getContext('2d')
      context.lineCap = lineCap
    }
  }, [width, canvasRef, lineCap])

  useEffect(() => {
    const timeouts = []
    const canvas = canvasRef.current

    if (width > 1 && canvas.getContext && !state.calculating) {
      const context = canvas.getContext('2d')

      context.resetTransform()
      if (clearBeforeDraw) {
        clearCanvas(context, width)
      }

      // refact

      const { points, boundaries } = calculateCurve(state.generation, state.curve)
      const xRatio = (width - padding * 2) / (boundaries.maxX - boundaries.minX)
      const yRatio = (width - padding * 2) / (boundaries.maxY - boundaries.minY)

      const calculateStartingPosition = state.curve.calculateStartingPosition
      const { x: startX, y: startY } = calculateStartingPosition(width, state.generation, xRatio)
      context.translate(startX, startY)

      for (let i = 0; i < points.length; i++) {
        if (drawFull) {
          drawSegment(context, points, i, xRatio, yRatio, selectedGradientName, selectedLineWidthStyle)
        } else {
          timeouts.push(
            setTimeout(
              () => drawSegment(context, points, i, xRatio, yRatio, selectedGradientName, selectedLineWidthStyle),
              i * 10
            )
          )
        }
      }
    }
    return () => clearRemainingTimeouts && timeouts.forEach(timeout => clearTimeout(timeout))
  }, [width, canvasRef, state, clearBeforeDraw, clearRemainingTimeouts, drawFull])

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
        // className="c"
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
          selectedGradientName = e.target.value
        }}
      >
        {gradientNames.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        onChange={e => {
          selectedLineWidthStyle = e.target.value
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
