import { useEffect } from 'react'
import { drawSegment, clearCanvas } from '../logic/draw'
import { calculateCurve } from '../logic/curve'
import { padding } from './constants'

function setCanvasContextProperty(context, value, drawPropertyName) {
  context[drawPropertyName] = value
}

export function useCanvasContextChange(width, canvasRef, value, drawPropertyName) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (width > 1 && canvas.getContext) {
      const context = canvas.getContext('2d')
      setCanvasContextProperty(context, value, drawPropertyName)
    }
  }, [width, canvasRef, value, drawPropertyName])
}

export function useSpaceFillingCurveDraw(
  width,
  canvasRef,
  state,
  clearBeforeDraw,
  drawFull,
  clearRemainingTimeouts,
  selectedGradientNameRef,
  selectedLineWidthStyleRef
) {
  useEffect(() => {
    const timeouts = []
    const canvas = canvasRef.current

    if (width > 1 && canvas.getContext && !state.calculating) {
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
          drawSegment(
            context,
            points,
            i,
            xRatio,
            yRatio,
            selectedGradientNameRef.current,
            selectedLineWidthStyleRef.current
          )
        } else {
          timeouts.push(
            setTimeout(
              () =>
                drawSegment(
                  context,
                  points,
                  i,
                  xRatio,
                  yRatio,
                  selectedGradientNameRef.current,
                  selectedLineWidthStyleRef.current
                ),
              i * 10
            )
          )
        }
      }
    }
    return () => clearRemainingTimeouts && timeouts.forEach(timeout => clearTimeout(timeout))
  }, [width, canvasRef, state, clearBeforeDraw, clearRemainingTimeouts, drawFull]) // eslint-disable-line react-hooks/exhaustive-deps
}
