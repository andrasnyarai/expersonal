let context
function draw(depth, x, y, length, offset) {
  if (depth === 0) {
    return
  }
  context.lineWidth = offset / 2
  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x + length, y)
  context.stroke()

  depth -= 1
  draw(depth, x, y + offset, length / 3, offset)
  draw(depth, x + (length * 2) / 3, y + offset, length / 3, offset)
}

export function drawCantorSet(ctx, width, depth) {
  context = ctx
  const offset = width / 10
  draw(depth, 0, offset, width, offset)
  context.lineWidth = 1
}
