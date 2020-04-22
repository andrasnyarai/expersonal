import { useState } from 'react'
import { useGesture } from 'react-use-gesture'

import { map, lerp } from '../../math/utils'
import { SET_FRAME } from './reducer'

function getDistanceBetweenPoints(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2))
}

function getMidPoint(pointA, pointB) {
  return {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2,
  }
}

function isPinchEvent(event) {
  const [a, b] = event.touches || []
  return a && b
}

function createPointsFromPinchEvent(event) {
  const [a, b] = event.touches
  return [
    { x: a.clientX, y: a.clientY },
    { x: b.clientX, y: b.clientY },
  ]
}

const startingPinchTransform = { x: 0, y: 0, scale: 1 }

export function usePinchZoom(state, dispatch, width, height) {
  const [pinchTransform, setPinchTransform] = useState(startingPinchTransform)
  const [pinchInitials, setPinchInitials] = useState(null)
  const [newDimensions, setNewDimensions] = useState(null)

  const bind = useGesture({
    onPinchStart: ({ event }) => {
      if (!isPinchEvent(event)) {
        return
      }

      const [a, b] = createPointsFromPinchEvent(event)
      const distance = getDistanceBetweenPoints(a, b)
      const midPoint = getMidPoint(a, b)

      setPinchInitials({
        x: a.x,
        y: a.y,
        distance,
        midPoint,
      })
    },
    onPinch: ({ event }) => {
      if (!isPinchEvent(event)) {
        return
      }

      // if pinchInitials are stale
      if (!pinchInitials) {
        setNewDimensions(state.dimensions)
        return
      }

      const [a, b] = createPointsFromPinchEvent(event)
      const currentDistance = getDistanceBetweenPoints(a, b)
      const currentMidPoint = getMidPoint(a, b)

      const { midPoint, distance } = pinchInitials
      const offsetX = currentMidPoint.x - midPoint.x
      const offsetY = currentMidPoint.y - midPoint.y
      const scale = currentDistance / distance

      const { top, bottom, left, right } = state.dimensions
      const scaleOrigo = {
        x: lerp(0.5, left, right),
        y: lerp(0.5, bottom, top),
      }

      const dimensionsScaled = {
        left: scaleOrigo.x - Math.abs(scaleOrigo.x - left) / scale,
        right: scaleOrigo.x + Math.abs(scaleOrigo.x - right) / scale,
        top: scaleOrigo.y + Math.abs(scaleOrigo.y - top) / scale,
        bottom: scaleOrigo.y - Math.abs(scaleOrigo.y - bottom) / scale,
      }

      const xPan = map(Math.abs(offsetX), [0, width], [0, Math.abs(dimensionsScaled.left - dimensionsScaled.right)])
      const yPan = map(Math.abs(offsetY), [0, height], [0, Math.abs(dimensionsScaled.top - dimensionsScaled.bottom)])

      if (offsetX > 0) {
        dimensionsScaled.left -= xPan
        dimensionsScaled.right -= xPan
      } else {
        dimensionsScaled.left += xPan
        dimensionsScaled.right += xPan
      }

      if (offsetY > 0) {
        dimensionsScaled.top += yPan
        dimensionsScaled.bottom += yPan
      } else {
        dimensionsScaled.top -= yPan
        dimensionsScaled.bottom -= yPan
      }

      setPinchTransform({
        x: offsetX,
        y: offsetY,
        scale: scale,
      })

      setNewDimensions(dimensionsScaled)
    },
    onPinchEnd() {
      dispatch({
        type: SET_FRAME,
        payload: {
          top: newDimensions.top,
          bottom: newDimensions.bottom,
          left: newDimensions.left,
          right: newDimensions.right,
        },
      })

      setTimeout(() => {
        setPinchInitials(null)
        setPinchTransform(startingPinchTransform)
      }, 0)
    },
  })

  return [bind, { pinchTransform, newDimensions }]
}
