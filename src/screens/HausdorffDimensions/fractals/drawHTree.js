let context
function draw(width, depth, x, y, lineSize) {
  if (depth === 0) {
    return
  }
  const halfLineSize = lineSize / 2

  context.beginPath()
  context.lineWidth = (depth * width) / 1000
  context.moveTo(x, y)
  context.lineTo(x + lineSize, y)

  context.moveTo(x, y - halfLineSize)
  context.lineTo(x, y + halfLineSize)

  context.moveTo(x + lineSize, y - halfLineSize)
  context.lineTo(x + lineSize, y + halfLineSize)
  context.stroke()

  depth -= 1
  draw(width, depth, x - lineSize / 4, y - halfLineSize, halfLineSize)
  draw(width, depth, x - lineSize / 4, y + halfLineSize, halfLineSize)
  draw(width, depth, x + (lineSize * 3) / 4, y - halfLineSize, halfLineSize)
  draw(width, depth, x + (lineSize * 3) / 4, y + halfLineSize, halfLineSize)
}

export function drawHTree(ctx, width, depth) {
  context = ctx
  const lineSize = width / 2
  const x = width / 4
  const y = width / 2
  draw(width, depth, x, y, lineSize)
}
