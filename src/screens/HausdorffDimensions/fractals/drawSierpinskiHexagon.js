let context
function draw(depth, x, y, size) {
  const halfSize = size / 2
  const thirdSize = size / 3
  const oneAndHalfSize = (size * 3) / 2

  const triangleHeight = Math.sqrt(size ** 2 - halfSize ** 2)
  const twoThirdHeight = (triangleHeight * 2) / 3

  depth -= 1
  if (depth === 0) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + halfSize, y - triangleHeight)
    context.lineTo(x + oneAndHalfSize, y - triangleHeight)
    context.lineTo(x + 2 * size, y)
    context.lineTo(x + oneAndHalfSize, y + triangleHeight)
    context.lineTo(x + halfSize, y + triangleHeight)
    context.fill()
  } else {
    draw(depth, x, y, thirdSize)
    draw(depth, x + thirdSize, y - twoThirdHeight, thirdSize)
    draw(depth, x + size, y - twoThirdHeight, thirdSize)
    draw(depth, x + 4 * thirdSize, y, thirdSize)
    draw(depth, x + thirdSize, y + twoThirdHeight, thirdSize)
    draw(depth, x + size, y + twoThirdHeight, thirdSize)
  }
}

export function drawSierpinskiHexagon(ctx, width, depth) {
  context = ctx
  draw(depth, 0, width / 2, width / 2)
}
