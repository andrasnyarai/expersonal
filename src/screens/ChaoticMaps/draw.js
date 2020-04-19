import { useEffect, useRef } from 'react'

import { map } from '../../math/utils'

let context
let width
let height

const padding = 4

function createXAxis(min, max) {
  return [...Array(width).keys()].map((_, i) => map(i, [0, width], [min, max]))
}

function plotCliffordMap(iterations) {
  const a = -1.7
  const b = 1.8
  const c = -1.9
  const d = -0.4

  let x = 0
  let y = 0
  return [...Array(iterations).keys()].map(() => {
    const nextX = Math.sin(a * y) + c * Math.cos(a * x)
    const nextY = Math.sin(b * x) + d * Math.cos(b * y)
    x = nextX
    y = nextY
    return {
      x: nextX,
      y: nextY,
    }
  })
}

function plotDeJongMap(iterations) {
  const a = -2
  const b = -2
  const c = -1.2
  const d = 2

  let x = 0
  let y = 0
  return [...Array(iterations).keys()].map(() => {
    const nextX = Math.sin(a * y) - Math.cos(b * x)
    const nextY = Math.sin(c * x) - Math.cos(d * y)
    x = nextX
    y = nextY
    return {
      x: nextX,
      y: nextY,
    }
  })
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
  let y = Math.random()

  return [...Array(skip + iterations).keys()].map(() => {
    const alpha = 6.2
    y = Math.exp(-alpha * y ** 2) + beta
    return {
      x: beta,
      y,
    }
  })
}

function plotLogisticMap(lambda, skip, iterations) {
  let y = Math.random()

  return [...Array(skip + iterations).keys()].map(() => {
    y = lambda * y * (1 - y)
    return {
      x: lambda,
      y,
    }
  })
}

const mapNameToPlotFn = {
  logistic: plotLogisticMap,
  gauss: plotGaussMap,

  'de jong': plotDeJongMap,
  clifford: plotCliffordMap,
}

function drawBifurcationDiagram(xAxis, state, animationRefIds) {
  const batchSize = 10
  const skip = 50
  const iterations = 500

  if (!xAxis.length) {
    return
  }

  const { bottom, top, left, right } = state
  xAxis.slice(0, batchSize).forEach(lambda => {
    const points = mapNameToPlotFn[state.mapName](lambda, skip, iterations)

    points.slice(skip).forEach(point => {
      const x = map(point.x, [left, right], [0, width])
      const y = map(point.y, [bottom, top], [height, 0])
      context.fillRect(x + padding, y + padding, 1, 1)
    })
  })

  const nextFrame = () => drawBifurcationDiagram(xAxis.slice(batchSize), state, animationRefIds)
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

function drawAttractor(points, animationRefIds) {
  const batchSize = 10000
  if (!points.length) {
    return
  }

  points.slice(0, batchSize).forEach(point => {
    const x = map(point.x, [-6, 6], [0, width])
    const y = map(point.y, [-2, 2], [height, 0])
    context.fillRect(x, y, 1, 1)
  })

  const nextFrame = () => drawAttractor(points.slice(batchSize), animationRefIds)
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
    context.globalAlpha = 0.9

    context.clearRect(0, 0, 1600, 800)

    // add padding to everywhere
    width = 1600 - padding * 2
    height = 800 - padding * 2

    if (state.mapName === 'logistic' || state.mapName === 'gauss') {
      const { left, right } = state
      const xAxis = createXAxis(left, right)
      const animationId = window.requestAnimationFrame(() => drawBifurcationDiagram(xAxis, state, animationRefIds))
      animationRefIds.push(animationId)
    }

    if (state.mapName === 'tinkerbell') {
      const iterationCount = 100000
      const points = plotTinkerbellMap(iterationCount)
      const animationId = window.requestAnimationFrame(() => drawTinkerbellMap(points, animationRefIds))
      animationRefIds.push(animationId)
    }

    if (state.mapName === 'henon') {
      const iterationCount = 10000
      const points = plotHenonMap(iterationCount)
      const animationId = window.requestAnimationFrame(() => drawHenonMap(points, animationRefIds))
      animationRefIds.push(animationId)
    }

    if (state.mapName === 'ikeda') {
      for (let i = 0; i < 1000; i++) {
        const iterationCount = 1000
        const points = plotIkedaMap(iterationCount)
        const animationId = window.requestAnimationFrame(() => drawIkedaMap(points, animationRefIds))
        animationRefIds.push(animationId)
      }
    }

    if (state.mapName === 'de jong' || state.mapName === 'clifford') {
      const iterationCount = 500000
      const points = mapNameToPlotFn[state.mapName](iterationCount)
      const animationId = window.requestAnimationFrame(() => drawAttractor(points, animationRefIds))
      animationRefIds.push(animationId)
    }

    return () => animationRefIds.forEach(id => window.cancelAnimationFrame(id))
  }, [state, canvasRef])
}
