let context
function draw(depth, xa, ya, squareSize) {
  if (depth === 0) {
    return
  }
  const halfSquareSize = squareSize / 2
  context.fillRect(xa + halfSquareSize, ya + halfSquareSize, squareSize, squareSize)

  depth -= 1
  draw(depth, xa, ya, halfSquareSize)
  draw(depth, xa + squareSize, ya, halfSquareSize)
  draw(depth, xa, ya + squareSize, halfSquareSize)
  draw(depth, xa + squareSize, ya + squareSize, halfSquareSize)
}

export function drawTSquare(ctx, width, depth) {
  context = ctx
  const squareSize = width / 2
  draw(depth, 0, 0, squareSize)
}
