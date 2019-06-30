import { radians } from './lib'
let context
function draw(depth, x0, y0, length, angle) {
  if (depth === 0) {
    return
  }
  const x1 = x0 + length * Math.cos(radians(angle))
  const y1 = y0 + length * Math.sin(radians(angle))
  context.lineWidth = depth
  context.beginPath()
  context.moveTo(x0, y0)
  context.lineTo(x1, y1)
  context.stroke()

  length *= 4 / 5
  depth -= 1
  draw(depth, x1, y1, length, angle + 45)
  draw(depth, x1, y1, length, angle - 45)
}
export function drawPythagorasTree(ctx, width, depth) {
  context = ctx
  draw(depth, width / 2, (width * 3) / 4, width / 8, -90)
  context.lineWidth = 1
}
