let context
function average(u, v) {
  return (u + v) / 2
}

function draw(depth, x0, y0, x1, y1, x2, y2) {
  depth -= 1
  if (depth === 0) {
    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x1, y1)
    context.lineTo(x2, y2)
    context.fill()
  } else {
    draw(depth, x0, y0, average(x0, x1), average(y0, y1), average(x0, x2), average(y0, y2))
    draw(depth, average(x0, x1), average(y0, y1), x1, y1, average(x1, x2), average(y1, y2))
    draw(depth, average(x0, x2), average(y0, y2), average(x1, x2), average(y1, y2), x2, y2)
  }
}

export function drawSierpinskiTriangle(ctx, width, depth) {
  context = ctx
  const origo = width / 2
  const size = (4 * width) / 5
  const triangleHeight = size * (Math.sqrt(3) / 2)

  draw(
    depth,
    origo,
    origo - triangleHeight / 2,
    origo - size / 2,
    origo + triangleHeight / 2,
    origo + size / 2,
    origo + triangleHeight / 2
  )
}
