let maxIterations
const dimensions = { xPlane: [-2.5, 1], yPlane: [-1.75, 1.75] }

// ƒc(z) = z² + c
function iterate(iteration, a, b, ca, cb) {
  const complexNumber = a ** 2 + b ** 2
  if (complexNumber > 16 || iteration === maxIterations) {
    return iteration
  }
  let [nextA, nextB] = calculate(a, b)
  iteration += 1
  return iterate(iteration, nextA + ca, nextB + cb, ca, cb)
}

function calculate(real, imaginary) {
  return [real ** 2 - imaginary ** 2, 2 * real * imaginary]
}

function map(value, [minFrom, maxFrom], [minTo, maxTo]) {
  return ((value - minFrom) * (maxTo - minTo)) / (maxFrom - minFrom) + minTo
}

export function drawMandelbrotSet(ctx, width, depth) {
  maxIterations = Math.floor(map(depth, [1, 10], [5, 100]))
  const canvasImage = ctx.getImageData(0, 0, width, width)

  let x = 0
  let y = 0
  for (let idx = 0; idx < canvasImage.data.length; idx += 4) {
    x += 1
    if (x === width) {
      x = 0
      y += 1
    }

    const a = map(x, [0, width], dimensions.xPlane)
    const b = map(y, [0, width], dimensions.yPlane)

    const iterations = iterate(0, a, b, a, b)

    let brightness
    if (iterations === maxIterations) {
      brightness = 0
    } else {
      const ShiftValue = 5
      const smoothedValue = map(iterations, [0, maxIterations], [0, ShiftValue])
      brightness = map(Math.sqrt(smoothedValue), [0, 1], [0, 255])
    }

    canvasImage.data[idx] = brightness
    canvasImage.data[idx + 1] = brightness
    canvasImage.data[idx + 2] = brightness
    canvasImage.data[idx + 3] = 255
  }

  ctx.putImageData(canvasImage, 0, 0)
}
