import { map } from '../../../../math/utils'

const selfCheck = typeof self !== 'undefined'

const dimensions = { xPlane: [-2.5, 1], yPlane: [-1.75, 1.75] }

// ƒc(z) = z² + c
function iterate(iteration, a, b, ca, cb, maxIterations) {
  const complexNumber = a ** 2 + b ** 2
  if (complexNumber > 16 || iteration === maxIterations) {
    return iteration
  }
  let [nextA, nextB] = calculate(a, b)
  iteration += 1
  return iterate(iteration, nextA + ca, nextB + cb, ca, cb, maxIterations)
}

function calculate(real, imaginary) {
  return [real ** 2 - imaginary ** 2, 2 * real * imaginary]
}

function setPixel(canvasImage, idx, value) {
  canvasImage.data[idx] = value
  canvasImage.data[idx + 1] = value
  canvasImage.data[idx + 2] = value
  canvasImage.data[idx + 3] = 255
}

function getBrightness(iterations, maxIterations) {
  let brightness
  if (iterations === maxIterations) {
    brightness = 0
  } else {
    const ShiftValue = 5
    const smoothedValue = map(iterations, [0, maxIterations], [0, ShiftValue])
    brightness = map(Math.sqrt(smoothedValue), [0, 1], [0, 255])
  }
  return brightness
}

function draw({ data }) {
  const { canvasImage, width, maxIterations } = data

  let x = 0
  let y = 0

  const canvasImageDataLength = canvasImage.data.length
  const halfWidth = width / 2

  for (let idx = 0; idx < canvasImageDataLength; idx += 4) {
    const inMirror = width % 2 === 0 ? y >= halfWidth : y > Math.floor(halfWidth)
    if (inMirror) {
      const mirroredY = halfWidth - (y - halfWidth) - 1
      const jumpPoint = (mirroredY * width + x) * 4
      const mirroredPixel = canvasImage.data[jumpPoint]

      setPixel(canvasImage, idx, mirroredPixel)
    } else {
      const a = map(x, [0, width], dimensions.xPlane)
      const b = map(y, [0, width], dimensions.yPlane)

      const iterations = iterate(0, a, b, a, b, maxIterations)
      const brightness = getBrightness(iterations, maxIterations)

      setPixel(canvasImage, idx, brightness)
    }

    x += 1
    if (x === width) {
      x = 0
      y += 1
    }
  }
  return canvasImage
}

if (selfCheck) {
  Object.assign(self, {
    onmessage: event => {
      selfCheck && self.postMessage({ canvasImage: draw(event) })
    },
  })
}
