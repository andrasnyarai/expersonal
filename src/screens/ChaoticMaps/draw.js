import { useEffect, useRef } from 'react'

import { map } from '../../math/utils'

let context
let width
let height

const padding = 4

function createLambdas(min, max) {
  return [...Array(width).keys()].map((_, i) => map(i, [0, width], [min, max]))
}

function plotIkedaMap(iterations) {
  const u = 0.918

  let x = Math.random()
  let y = Math.random()
  return [...Array(iterations).keys()].map(() => {
    const t = 0.4 - 6 / (1 + x ** 2 + y ** 2)
    const nextX = 1 + u * (x * Math.cos(t) - y * Math.sin(t))
    const nextY = u * (x * Math.sin(t) + y * Math.cos(t))
    x = nextX
    y = nextY
    return {
      x: nextX,
      y: nextY,
    }
  })
}

function plotHenonMap(iterations) {
  const a = 1.4 // 0.2 x (-4..4) y (-4..4)
  const b = 0.3 // 0.9991

  let x = 0
  let y = 0
  return [...Array(iterations).keys()].map(() => {
    const nextX = 1 - a * x ** 2 + y
    const nextY = b * x
    x = nextX
    y = nextY
    return {
      x: nextX,
      y: nextY,
    }
  })
}

function plotTinkerbellMap(iterations) {
  const point = {
    x: -0.72,
    y: -0.64,
  }
  const a = 0.9
  const b = -0.6013
  const c = 2.0
  const d = 0.5
  return [...Array(iterations).keys()].map(() => {
    const { x, y } = point
    const nextX = x ** 2 - y ** 2 + a * x + b * y
    const nextY = 2 * x * y + c * x + d * y
    point.x = nextX
    point.y = nextY
    return {
      x: nextX,
      y: nextY,
    }
  })
}

function plotGaussMap(beta, skip, iterations) {
  let x = Math.random()

  return [...Array(skip + iterations).keys()].map(() => {
    const alpha = 6.2
    x = Math.exp(-alpha * x ** 2) + beta
    return x
  })
}

function plotLogisticMap(lambda, skip, iterations) {
  let p = Math.random()

  return [...Array(skip + iterations).keys()].map(() => {
    p = lambda * p * (1 - p)
    return p
  })
}

function calculateLeft(lambda, startLambda, endLambda) {
  return map(lambda, [startLambda, endLambda], [0, width])
}

function calculateTop(p, bottom, top) {
  return map(p, [bottom, top], [height, 0])
}

function drawBifurcationDiagram(lambdas, state, animationRefIds) {
  const batchSize = 10
  const skip = 50
  const iterations = 500
  if (!lambdas.length) {
    return
  }

  const { bottom, top, startLambda, endLambda } = state
  lambdas.slice(0, batchSize).forEach(lambda => {
    const populations = plotLogisticMap(lambda, skip, iterations)
    const x = calculateLeft(lambda, startLambda, endLambda)

    populations.slice(skip).forEach(p => {
      const y = calculateTop(p, bottom, top)
      context.fillRect(x + padding, y + padding, 1, 1)
    })
  })

  const nextFrame = () => drawBifurcationDiagram(lambdas.slice(batchSize), state, animationRefIds)
  const animationId = window.requestAnimationFrame(nextFrame)
  animationRefIds.push(animationId)
}

function drawTinkerbellMap(points, animationRefIds) {
  const batchSize = 1000
  if (!points.length) {
    return
  }

  points.slice(0, batchSize).forEach(point => {
    const x = map(point.x, [-2.0, 1.0], [padding, width])
    const y = map(point.y, [-2, 1], [height, 0])
    context.fillRect(x, y, 1, 1)
  })

  const nextFrame = () => drawTinkerbellMap(points.slice(batchSize), animationRefIds)
  const animationId = window.requestAnimationFrame(nextFrame)
  animationRefIds.push(animationId)
}

// these two functions are almost the same
function drawHenonMap(points, animationRefIds) {
  const batchSize = 100
  if (!points.length) {
    return
  }

  points.slice(0, batchSize).forEach(point => {
    const x = map(point.x, [-3, 3], [0, width])
    const y = map(point.y, [-0.4, 0.4], [height, 0])
    context.fillRect(x, y, 1, 1)
  })

  const nextFrame = () => drawHenonMap(points.slice(batchSize), animationRefIds)
  const animationId = window.requestAnimationFrame(nextFrame)
  animationRefIds.push(animationId)
}

function drawIkedaMap(points, animationRefIds) {
  const batchSize = 1
  if (!points.length) {
    return
  }

  points.slice(0, batchSize).forEach(point => {
    const x = map(point.x, [-2, 8], [0, width])
    const y = map(point.y, [-3, 7], [height, 0])
    context.fillRect(x, y, 1, 1)
  })

  const nextFrame = () => drawIkedaMap(points.slice(batchSize), animationRefIds)
  const animationId = window.requestAnimationFrame(nextFrame)
  animationRefIds.push(animationId)
}

export function useChaoticMapsDraw(canvasRef, state) {
  const animationFrameIdRefs = useRef([])

  useEffect(() => {
    const animationRefIds = animationFrameIdRefs.current

    if (!canvasRef.current) {
      return
    }
    context = canvasRef.current.getContext('2d')

    context.clearRect(0, 0, 1600, 800)

    // add padding to everywhere
    width = 1600 - padding * 2
    height = 800 - padding * 2

    {
      const iterationCount = 100000
      const points = plotTinkerbellMap(iterationCount)
      const animationId = window.requestAnimationFrame(() => drawTinkerbellMap(points, animationRefIds))
      animationRefIds.push(animationId)
    }

    {
      const iterationCount = 10000
      const points = plotHenonMap(iterationCount)
      const animationId = window.requestAnimationFrame(() => drawHenonMap(points, animationRefIds))
      animationRefIds.push(animationId)
    }

    {
      for (let i = 0; i < 1000; i++) {
        const iterationCount = 1000
        const points = plotIkedaMap(iterationCount)
        const animationId = window.requestAnimationFrame(() => drawIkedaMap(points, animationRefIds))
        animationRefIds.push(animationId)
      }
    }

    {
      const { startLambda, endLambda } = state
      const lambdas = createLambdas(startLambda, endLambda)
      const animationId = window.requestAnimationFrame(() => drawBifurcationDiagram(lambdas, state, animationRefIds))
      animationRefIds.push(animationId)
    }

    return () => animationRefIds.forEach(id => window.cancelAnimationFrame(id))
  }, [state, canvasRef])
}
