import { useEffect, useRef } from 'react'

import { map } from '../../math/utils'

let context
let width
let height

const padding = 4
const skip = 50
const iterations = 500

const batchSize = 10
let batchIndex

function createLambdas(min, max) {
  return [...Array(width).keys()].map((_, i) => map(i, [0, width], [min, max]))
}

function plotGaussMap(beta) {
  let x = Math.random()
  return [...Array(skip + iterations).keys()].map(() => {
    // x(n+1) = exp(-αx²) + β
    const alpha = 6.2 // -> differs
    x = Math.exp(-alpha * x ** 2) + beta
    return x
  })
}

function plotLogisticMap(lambda) {
  let p = Math.random()

  return [...Array(skip + iterations).keys()].map(() => {
    // p(n+1) = λ * p(n) * (1.0 - p(n))
    p = lambda * p * (1.0 - p)
    return p
  })
}

function calculateLeft(lambda, startLambda, endLambda) {
  return map(lambda, [startLambda, endLambda], [0, width])
}

function calculateTop(p, bottom, top) {
  return map(p, [bottom, top], [height, 0])
}

function draw(lambdas, state, animationFrameIdRef) {
  if (batchIndex >= width) {
    return
  }

  const { bottom, top, startLambda, endLambda } = state

  const lambdaBatch = lambdas.slice(batchIndex)

  for (let i = 0; i < batchSize; i++) {
    const lambda = lambdaBatch[i]
    const populations = plotLogisticMap(lambda)

    const x = calculateLeft(lambda, startLambda, endLambda)
    populations.splice(skip).forEach(p => {
      const y = calculateTop(p, bottom, top)

      context.fillRect(x + padding, y + padding, 1, 1)
    })
  }

  batchIndex += batchSize
  animationFrameIdRef.current = window.requestAnimationFrame(() => draw(lambdas, state, animationFrameIdRef))
}

export function useBifurcationDraw(canvasRef, state) {
  const animationFrameIdRef = useRef()

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    context = canvasRef.current.getContext('2d')

    context.clearRect(0, 0, 1600, 800)
    batchIndex = 0

    width = 1600 - padding * 2
    height = 800 - padding * 2

    const { startLambda, endLambda } = state
    const lambdas = createLambdas(startLambda, endLambda)

    animationFrameIdRef.current = window.requestAnimationFrame(() => draw(lambdas, state, animationFrameIdRef))
    return () => window.cancelAnimationFrame(animationFrameIdRef.current)
  }, [state, canvasRef])
}
