import { useEffect, useRef } from 'react'

import { map } from '../../math/utils'
import { plotDefinitions } from './plotDefinitions'

let context
let width
let height

function plotChaoticMap(xPos, state, iterations) {
  const { getInitial, iterate, parameters } = state
  const pointTracker = getInitial({ x: xPos })

  return [...Array(iterations).keys()].map(() => {
    const { x, y } = iterate({ x: pointTracker.x, y: pointTracker.y }, parameters)
    pointTracker.x = x
    pointTracker.y = y
    return { ...pointTracker }
  })
}

function createXAxis(min, max) {
  return [...Array(width).keys()].map((_, i) => map(i, [0, width], [min, max]))
}

function drawBifurcationDiagram(xAxis, state, animationRefIds) {
  const { iterations, batchSize } = plotDefinitions[state.mapName]
  const skip = 50
  if (!xAxis.length) {
    return
  }

  const { bottom, top, left, right } = state.dimensions
  xAxis.slice(0, batchSize).forEach(xPos => {
    const points = plotChaoticMap(xPos, state, skip + iterations)

    points.slice(skip).forEach(point => {
      const x = map(point.x, [left, right], [0, width])
      const y = map(point.y, [bottom, top], [height, 0])
      context.fillRect(x, y, 1, 1)
    })
  })

  const nextFrame = () => drawBifurcationDiagram(xAxis.slice(batchSize), state, animationRefIds)
  const animationId = window.requestAnimationFrame(nextFrame)
  animationRefIds.push(animationId)
}

function drawAttractor(points, state, animationRefIds) {
  const { batchSize, dimensions } = state
  const { bottom, top, left, right } = dimensions
  if (!points.length) {
    return
  }

  points.slice(0, batchSize).forEach(point => {
    const x = map(point.x, [left, right], [0, width])
    const y = map(point.y, [bottom, top], [height, 0])
    context.fillRect(x, y, 1, 1)
  })

  const nextFrame = () => drawAttractor(points.slice(batchSize), state, animationRefIds)
  const animationId = window.requestAnimationFrame(nextFrame)
  animationRefIds.push(animationId)
}

export function useChaoticMapsDraw(
  canvasRef,
  state,
  canvasWidth,
  canvasHeight,
  isMediumScreen,
  shouldPreservePrevious,
) {
  const animationFrameIdRefs = useRef([])

  useEffect(() => {
    const animationRefIds = animationFrameIdRefs.current

    if (!canvasRef.current || canvasWidth <= 1) {
      return
    }

    context = canvasRef.current.getContext('2d')
    width = canvasWidth
    height = canvasHeight

    context.globalAlpha = shouldPreservePrevious ? 0.2 : 1
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
    context.fillStyle = 'black'

    if (['logistic', 'gauss'].includes(state.mapName)) {
      const { left, right } = state.dimensions
      const xAxis = createXAxis(left, right)
      const animationId = window.requestAnimationFrame(() => drawBifurcationDiagram(xAxis, state, animationRefIds))
      animationRefIds.push(animationId)
    } else {
      const iterations = state.iterations / (isMediumScreen ? 4 : 1)
      const numberOfDrawCalls = state.mapName === 'ikeda' ? iterations : 1
      for (let i = 0; i < numberOfDrawCalls; i++) {
        const points = plotChaoticMap(null, state, iterations)
        const animationId = window.requestAnimationFrame(() => drawAttractor(points, state, animationRefIds))
        animationRefIds.push(animationId)
      }
    }

    return () => animationRefIds.forEach(id => window.cancelAnimationFrame(id))
  }, [state, canvasRef, canvasWidth, canvasHeight, isMediumScreen, shouldPreservePrevious])
}
