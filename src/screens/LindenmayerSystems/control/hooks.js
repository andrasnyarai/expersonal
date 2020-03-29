import { useEffect } from 'react'
import { drawSegment, clearCanvas } from '../logic/draw'
import { calculateCurve } from '../logic/curve'
import { padding } from './constants'

const windowGlobal = typeof window !== 'undefined' && window

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

export function useSpaceFillingCurveDraw(width, canvasRef, state) {
  useEffect(() => {
    let requestId
    let referenceIndex = 0
    const canvas = canvasRef.current

    if (width > 1 && canvas.getContext && !state.calculating) {
      const context = canvas.getContext('2d')

      context.resetTransform()
      if (state.graphicOptions.clearBeforeDraw) {
        clearCanvas(context, width)
      }

      const { points, boundaries } = calculateCurve(state.generation, state.curve)
      const xRatio = (width - padding * 2) / (boundaries.maxX - boundaries.minX)
      const yRatio = (width - padding * 2) / (boundaries.maxY - boundaries.minY)

      const calculateStartingPosition = state.curve.calculateStartingPosition
      const { x: startX, y: startY } = calculateStartingPosition(width, state.generation, xRatio)

      context.translate(startX, startY)

      /* eslint-disable no-inner-declarations */
      function drawSegmentAtIndex(index) {
        drawSegment(
          context,
          points,
          index,
          xRatio,
          yRatio,
          state.graphicOptions.gradientName,
          state.graphicOptions.lineWidthStyle,
        )
      }

      function step() {
        drawSegmentAtIndex(referenceIndex)
        referenceIndex += 1
        if (referenceIndex < points.length) {
          requestId = windowGlobal.requestAnimationFrame(step)
        }
      }
      /* eslint-enable no-inner-declarations */

      if (state.graphicOptions.drawFull) {
        for (let i = 0; i < points.length; i++) {
          drawSegmentAtIndex(i)
        }
      } else {
        requestId = windowGlobal.requestAnimationFrame(step)
      }
    }
    return () => state.graphicOptions.clearRemainingAnimations && windowGlobal.cancelAnimationFrame(requestId)
  }, [width, canvasRef, state])
}
