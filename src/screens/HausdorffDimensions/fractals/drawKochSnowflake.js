import { radians } from './lib'
let context
function calculatePoints(x, y, length, angles) {
  let lastX = x
  let lastY = y
  return angles.map(angle => {
    const nextX = lastX + length * Math.cos(radians(angle))
    const nextY = lastY + length * Math.sin(radians(angle))
    lastX = nextX
    lastY = nextY
    return [nextX, nextY]
  })
}

function draw(depth, x0, y0, lineLength, ...angles) {
  const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = calculatePoints(x0, y0, lineLength, angles)

  depth -= 1
  if (depth === 0) {
    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineTo(x3, y3)
    context.lineTo(x4, y4)
    context.stroke()
    return
  }

  lineLength /= 3
  draw(depth, x0, y0, lineLength, ...angles)
  draw(depth, x1, y1, lineLength, ...angles.map(n => n - 60))
  draw(depth, x2, y2, lineLength, ...angles.map(n => n - 300))
  draw(depth, x3, y3, lineLength, ...angles)
}
export function drawKochSnowflake(ctx, width, depth) {
  context = ctx
  const origo = width / 2
  let size = (4 * width) / 5

  const triangleHeight = size * (Math.sqrt(3) / 2)
  const origoOffset = triangleHeight / 2
  const oneSixthTriangleHeight = triangleHeight / 6

  const lineLength = size / 3
  const anglesTop = [0, -60, -300, 0]
  draw(depth, origo - size / 2, origo - origoOffset + oneSixthTriangleHeight, lineLength, ...anglesTop)
  const anglesRight = [120, -300, 180, 120]
  draw(depth, origo + size / 2, origo - origoOffset + oneSixthTriangleHeight, lineLength, ...anglesRight)
  const anglesLeft = [240, 180, -60, 240]
  draw(depth, origo, origo + origoOffset + oneSixthTriangleHeight, lineLength, ...anglesLeft)
}
