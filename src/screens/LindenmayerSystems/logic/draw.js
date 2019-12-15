import { map } from '../../../math/utils'
import { easeGradients, lineWidthStyleMap } from '../control/constants'

function getGradientSegment(normalizedIndex, gradientName) {
  return easeGradients(normalizedIndex)[gradientName]
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

export function clearCanvas(context, width) {
  context.clearRect(0, 0, width, width)
}
