let context
function draw(depth, x, y, size) {
  if (depth === 0) {
    return
  }
  context.fillRect(x, y, size, size)

  const oneThirdSize = size / 3
  const twoThirdSize = (size * 2) / 3
  const fourThirdSize = (size * 4) / 3
  const fourSixthSize = twoThirdSize * 2

  depth -= 1
  draw(depth, x - twoThirdSize, y - twoThirdSize, oneThirdSize)
  draw(depth, x - twoThirdSize, y + oneThirdSize, oneThirdSize)
  draw(depth, x - twoThirdSize, y + fourThirdSize, oneThirdSize)

  draw(depth, x + oneThirdSize, y - twoThirdSize, oneThirdSize)
  draw(depth, x + oneThirdSize, y + fourThirdSize, oneThirdSize)

  draw(depth, x + fourSixthSize, y - twoThirdSize, oneThirdSize)
  draw(depth, x + fourSixthSize, y + oneThirdSize, oneThirdSize)
  draw(depth, x + fourSixthSize, y + fourThirdSize, oneThirdSize)
}

export function drawSierpinskiCarpet(ctx, width, depth) {
  context = ctx
  const oneThirdWidth = width / 3
  draw(depth, oneThirdWidth, oneThirdWidth, oneThirdWidth)
}
