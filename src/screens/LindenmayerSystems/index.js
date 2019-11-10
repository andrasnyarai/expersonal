import React, { useEffect, useRef, useReducer, useState } from 'react'
import useResizeObserver from 'use-resize-observer'

import curves from './spaceFillingCurves'
import { CanvasWrapper, Canvas } from './style'
import { reducer, initialState } from './reducer'
import { SET_GENERATION, SET_CURVE } from './actions'
import { padding, gradients, compositeOperations } from './constants'
import { drawSegment, calculateCurve, clearCanvas } from './utils'

let selectedGradientName = gradients[0] // maybe mpove to useState as well

// context.lineCap = 'round' //butt round square
// tangens log
// resize
// filter down operations
// set timing?

// pressets ?

export default function LindenmayerSystems() {
  const canvasRef = useRef()
  const [resizeRef, width] = useResizeObserver()

  const [state, dispatch] = useReducer(reducer, initialState)

  const [operation, setOperation] = useState(compositeOperations[0])

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
    const timeouts = []
    const canvas = canvasRef.current

    if (width > 1 && canvas.getContext) {
      const context = canvas.getContext('2d')

      context.resetTransform()
      if (clearBeforeDraw) {
        clearCanvas(context, width)
      }

      const { points, boundaries } = calculateCurve(state.generation, state.curve)
      const xRatio = (width - padding * 2) / (boundaries.maxX - boundaries.minX)
      const yRatio = (width - padding * 2) / (boundaries.maxY - boundaries.minY)

      const calculateStartingPosition = state.curve.calculateStartingPosition
      const { x: startX, y: startY } = calculateStartingPosition(width, state.generation, xRatio)
      context.translate(startX, startY)

      for (let i = 0; i < points.length; i++) {
        if (drawFull) {
          drawSegment(context, points, i, xRatio, yRatio, selectedGradientName)
        } else {
          timeouts.push(setTimeout(() => drawSegment(context, points, i, xRatio, yRatio, selectedGradientName), i * 10))
        }
      }
    }
    return () => clearRemainingTimeouts && timeouts.forEach(timeout => clearTimeout(timeout))
  }, [width, canvasRef, state, clearBeforeDraw, clearRemainingTimeouts, drawFull])

  return (
    <>
      <CanvasWrapper ref={resizeRef}>
        <Canvas ref={canvasRef} height={width} width={width} />
      </CanvasWrapper>
      <input
        type="range"
        min={1}
        max={state.curve.maxGeneration}
        step={1}
        value={state.generation}
        onChange={e => {
          dispatch({ type: SET_GENERATION, payload: Number(e.target.value) })
        }}
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
          selectedGradientName = e.target.value
        }}
      >
        {gradients.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
      {state.generation}
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
