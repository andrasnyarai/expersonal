import { map } from '../HausdorffDimensions/fractals/lib' // move to shared math utils

function getGradientSegment(normalizedIndex, gradientName) {
  const ascendingChannel = 55 + normalizedIndex
  const descendingChannel = 255 - normalizedIndex
  const halvingChannel = normalizedIndex / 2
  const doublingChannel = Math.max(255, normalizedIndex * 2)

  switch (gradientName) {
    case 'polarShift': {
      return [descendingChannel, halvingChannel, ascendingChannel]
    }
    case 'forest': {
      return [15, halvingChannel, 45]
    }
    case 'ice': {
      return [halvingChannel, descendingChannel, descendingChannel]
    }
    case 'noir': {
      return [ascendingChannel - 55, ascendingChannel - 55, ascendingChannel - 55]
    }
    case 'mesmered': {
      return [descendingChannel, 25, 24]
    }
    case 'crystal': {
      return [descendingChannel - 20, doublingChannel * 0.7, doublingChannel]
    }
    case 'emerald': {
      return [doublingChannel * 0.5, halvingChannel * 1.6, ascendingChannel + 20]
    }
    case 'winterScape': {
      return [descendingChannel - 125, ascendingChannel / 2.5, halvingChannel + 5]
    }
    case 'sunBurst': {
      return [doublingChannel, ascendingChannel, halvingChannel]
    }
    case 'leaf': {
      return [50, ascendingChannel, halvingChannel]
    }
    case 'dreamHaze': {
      return [ascendingChannel, halvingChannel, halvingChannel]
    }
    case 'sealike': {
      return [halvingChannel * 0.2, ascendingChannel, descendingChannel]
    }
  }
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

  const drawAtOnce = false //neon
  if (drawAtOnce) {
    context.moveTo(prevX, prevY)
    context.lineTo(x, y)
    context.stroke()
  } else {
    path.moveTo(prevX, prevY)
    path.lineTo(x, y)
    context.stroke(path)
  }
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
  context.fillStyle = 'rgba(0,0,0)' // rgba?
  //context.fillStyle = 'rgba(255,255,255,1)' // rgba?
  context.clearRect(0, 0, width, width) // black as well
}
