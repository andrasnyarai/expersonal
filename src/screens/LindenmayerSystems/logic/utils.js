import { map } from '../../HausdorffDimensions/fractals/lib' // move to shared math utils
import { easeGradients } from '../control/constants'

function getGradientSegment(normalizedIndex, gradientName) {
  return easeGradients(normalizedIndex)[gradientName]
}

export const lineWidthStyleMap = {
  default: () => 3,
  tan: Math.tan,
  log: i => Math.log(Math.tan(i)),
  fround: Math.fround,
  sqrt: Math.sqrt,
  exp: Math.exp,
  big: () => 32,
}

function getLineWidth(lineWidthStyle, i) {
  return lineWidthStyleMap[lineWidthStyle](i)
}

function setSegmentStyle(context, i, pointsLength, gradientName, lineWidthStyle) {
  const normalizedIndex = map(i, [0, pointsLength], [0, 200])
  const [r, g, b] = getGradientSegment(normalizedIndex, gradientName)
  context.strokeStyle = `rgb(${[r, g, b].join(',')})`
  context.lineWidth = getLineWidth(lineWidthStyle, i)
}

function calculatePointPosition(point, xRatio, yRatio) {
  const { x, y } = point
  return { x: x * xRatio, y: y * yRatio }
}

export function drawSegment(context, points, i, xRatio, yRatio, gradientName, lineWidthStyle) {
  const path = new Path2D()
  const currentPoint = points[i]
  const previousPoint = i === 0 ? { x: 0, y: 0 } : points[i - 1]

  const { x: prevX, y: prevY } = calculatePointPosition(previousPoint, xRatio, yRatio)
  const { x, y } = calculatePointPosition(currentPoint, xRatio, yRatio)

  setSegmentStyle(context, i, points.length, gradientName, lineWidthStyle)

  path.moveTo(prevX, prevY)
  path.lineTo(x, y)
  context.stroke(path)
}

// split this two

function iterateSymbols(depth, instructionSymbols, productionRules) {
  if (depth === 0) {
    return instructionSymbols
  }

  const nextInstructionSymbols = instructionSymbols
    .split('')
    .map(symbol => productionRules[symbol] || symbol)
    .join('')

  depth -= 1
  return iterateSymbols(depth, nextInstructionSymbols, productionRules)
}

function convertSymbolsToSpatialPoints(symbols, degree) {
  const pointTracker = { x: 0, y: 0 }
  const aStep = (degree * Math.PI) / 180

  let maxX = 0
  let minX = 0
  let maxY = 0
  let minY = 0
  let a = 0
  const points = []

  symbols.forEach(symbol => {
    if (symbol === 'F') {
      pointTracker.x += Number(Math.cos(a).toFixed(5))
      pointTracker.y += Number(Math.sin(a).toFixed(5))
      maxX = Math.max(pointTracker.x, maxX)
      minX = Math.min(pointTracker.x, minX)
      maxY = Math.max(pointTracker.y, maxY)
      minY = Math.min(pointTracker.y, minY)

      points.push({ ...pointTracker })
    }
    if (symbol === '-') {
      a -= aStep
    }
    if (symbol === '|') {
      a -= Math.PI
    }
    if (symbol === '+') {
      a += aStep
    }
  })

  return {
    points,
    boundaries: {
      maxX,
      minX,
      maxY,
      minY,
    },
  }
}

export function calculateCurve(generation, curve) {
  const { axiom, productionRules, degree } = curve
  const symbols = iterateSymbols(generation, axiom, productionRules).split('')
  return convertSymbolsToSpatialPoints(symbols, degree)
}

export function clearCanvas(context, width) {
  context.clearRect(0, 0, width, width)
}
