let context
function draw(depth, xa, ya, size) {
  depth -= 1
  if (depth === 0) {
    context.fillRect(xa + 1 * size, ya, size, size)
    context.fillRect(xa + 1 * size, ya + 1 * size, size, size)
    context.fillRect(xa, ya + 1 * size, size, size)
    context.fillRect(xa + 2 * size, ya + 1 * size, size, size)
    context.fillRect(xa + 1 * size, ya + 2 * size, size, size)
  } else {
    draw(depth, xa + size, ya, size / 3)
    draw(depth, xa + 2 * size, ya + size, size / 3)
    draw(depth, xa + size, ya + 2 * size, size / 3)
    draw(depth, xa, ya + size, size / 3)
    draw(depth, xa + size, ya + size, size / 3)
  }
}

export function drawVicsekSnowflake(ctx, width, depth) {
  context = ctx
  draw(depth, 0, 0, width / 3)
}
