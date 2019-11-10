import React, { useEffect, useRef, useReducer, useState } from 'react'
import useResizeObserver from 'use-resize-observer'

import curves from './spaceFillingCurves'
import { CanvasWrapper, Canvas } from './style'
import { reducer, initialState } from './reducer'
import { SET_GENERATION, SET_CURVE } from './actions'
import { padding, gradients, compositeOperations, lineCaps } from './constants'
import { drawSegment, calculateCurve, clearCanvas, lineWidthStyleMap } from './utils'

let selectedGradientName = gradients[0]
let selectedLineWidthStyle = 'default'

// clear style: black white, halfopaque, fullopaque

// filter down operations

// neon drawatonce

// structure controls meaningful to each other!
// pressets ?
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
        {gradients.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
      {state.generation}
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
