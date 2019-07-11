import DrawWorker from './mandelbrot.worker'
import { map } from './../lib'
import { createNotifier } from './createNotifier'

const DRAW_FINISH = 'drawFinish'
const notifier = createNotifier()
notifier.registerEvent(DRAW_FINISH)

let working = false
let worker = new DrawWorker()

const cache = {}

function setupWorker(worker, context, cacheKey) {
  worker.onmessage = event => {
    const { canvasImage } = event.data
    context.putImageData(canvasImage, 0, 0)
    working = false
    cache[cacheKey] = canvasImage
    notifier.dispatchEvent(DRAW_FINISH)
  }
  working = true
  return worker
}

export async function drawMandelbrotSet(ctx, width, depth) {
  const maxIterations = Math.floor(map(depth, [1, 10], [5, 100]))
  const canvasImage = ctx.getImageData(0, 0, width, width)
  const cacheKey = `${width}-${maxIterations}`

  if (working) {
    worker.terminate()
    worker = new DrawWorker()
  }

  if (cache[cacheKey]) {
    ctx.putImageData(cache[cacheKey], 0, 0)
    return
  }

  setupWorker(worker, ctx, cacheKey).postMessage({ canvasImage, width, maxIterations })

  return new Promise(resolve => {
    notifier.addEventListener(DRAW_FINISH, resolve)
  })
}
