import { useState, useEffect } from 'react'
import { useGesture } from 'react-use-gesture'

import { map, lerp, clamp } from '../../math/utils'
import { SET_FRAME } from './reducer'

function getDistanceBetweenPoints(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2))
}

function getPivot(pointA, pointB) {
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

function scaleDimensions(dimensions, scale) {
  const { top, bottom, left, right } = dimensions

  const scaleOrigo = {
    x: lerp(0.5, left, right),
    y: lerp(0.5, bottom, top),
  }

  return {
    left: scaleOrigo.x - Math.abs(scaleOrigo.x - left) / scale,
    right: scaleOrigo.x + Math.abs(scaleOrigo.x - right) / scale,
    top: scaleOrigo.y + Math.abs(scaleOrigo.y - top) / scale,
    bottom: scaleOrigo.y - Math.abs(scaleOrigo.y - bottom) / scale,
  }
}

function translateDimensions(dimensions, x, y, width, height) {
  const { top, bottom, left, right } = dimensions

  const xPan = map(Math.abs(x), [0, width], [0, Math.abs(left - right)])
  const yPan = map(Math.abs(y), [0, height], [0, Math.abs(top - bottom)])

  return {
    left: x > 0 ? left - xPan : left + xPan,
    right: x > 0 ? right - xPan : right + xPan,
    top: y > 0 ? top + yPan : top - yPan,
    bottom: y > 0 ? bottom + yPan : bottom - yPan,
  }
}

const startingPinchTransform = { x: 0, y: 0, scale: 1 }

export function usePinchZoom(state, dispatch, width, height) {
  const [pinchTransform, setPinchTransform] = useState(startingPinchTransform)
  const [pinchInitials, setPinchInitials] = useState(null)
  const [newDimensions, setNewDimensions] = useState(null)
  const [isPinching, setIsPinching] = useState(false)

  useEffect(() => {
    // don't reset state if pinch action is ongoing
    if (!isPinching) {
      setPinchInitials(null)
      setPinchTransform(startingPinchTransform)
    }
  }, [state.dimensions, isPinching])

  const desktopHandlers = {
    onWheel: ({ movement }) => {
      const [, y] = movement
      const min = 0
      const max = 2
      const scale = clamp(map(y, [-500, 500], [min, max]), 0.5, max)
      setPinchTransform({ x: 0, y: 0, scale })
    },

    onWheelEnd: () => {
      dispatch({
        type: SET_FRAME,
        payload: scaleDimensions(state.dimensions, pinchTransform.scale),
      })
    },

    onDrag: ({ movement }) => {
      const [x, y] = movement
      setPinchTransform({ x, y, scale: 1 })
    },

    onDragEnd: () => {
      dispatch({
        type: SET_FRAME,
        payload: translateDimensions(state.dimensions, pinchTransform.x, pinchTransform.y, width, height),
      })
    },
  }

  const isTouchDevice = 'ontouchstart' in window

  const bind = useGesture(
    {
      ...(!isTouchDevice && desktopHandlers),
      onPinchStart: ({ event }) => {
        if (!isPinchEvent(event)) {
          return
        }

        const [a, b] = createPointsFromPinchEvent(event)
        const distance = getDistanceBetweenPoints(a, b)
        const pivot = getPivot(a, b)

        setPinchInitials({
          x: a.x,
          y: a.y,
          distance,
          pivot,
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

        setIsPinching(true)

        const [a, b] = createPointsFromPinchEvent(event)
        const currentDistance = getDistanceBetweenPoints(a, b)
        const currentPivot = getPivot(a, b)

        const { pivot, distance } = pinchInitials
        const offsetX = currentPivot.x - pivot.x
        const offsetY = currentPivot.y - pivot.y
        const scale = currentDistance / distance

        const scaledDimensions = scaleDimensions(state.dimensions, scale)
        const scaledAndTranslatedDimensions = translateDimensions(scaledDimensions, offsetX, offsetY, width, height)

        setPinchTransform({ x: offsetX, y: offsetY, scale: scale })
        setNewDimensions(scaledAndTranslatedDimensions)
      },

      onPinchEnd: () => {
        // on a trackPad its possible to simulate touch calls
        // without a valid pinch event
        if (!newDimensions) {
          return
        }

        setIsPinching(false)
        dispatch({
          type: SET_FRAME,
          payload: {
            top: newDimensions.top,
            bottom: newDimensions.bottom,
            left: newDimensions.left,
            right: newDimensions.right,
          },
        })
      },
    },
    {
      wheel: {
        axis: 'y',
      },
    },
  )

  return [bind, { pinchTransform, newDimensions }]
}
