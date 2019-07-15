import DrawWorker from './mandelbrot.worker'
import { map } from './../lib'
import { createNotifier } from './createNotifier'

const cache = {}
const DRAW_FINISH = 'drawFinish'
const notifier = createNotifier()
notifier.registerEvent(DRAW_FINISH)

let worker = typeof window !== 'undefined' && new DrawWorker()

function startWorker(worker, context, cacheKey) {
  worker.onmessage = event => {
    const { canvasImage } = event.data
    context.putImageData(canvasImage, 0, 0)
    worker.isWorking = false
    cache[cacheKey] = canvasImage
    notifier.dispatchEvent(DRAW_FINISH)
  }
  worker.isWorking = true
  return worker
}

export function refreshWorker() {
  if (worker.isWorking) {
    worker.terminate()
    worker = new DrawWorker()
    worker.isWorking = false
  }
}

export async function drawMandelbrotSet(ctx, width, depth) {
  const maxIterations = Math.floor(map(depth, [1, 10], [5, 100]))
  const canvasImage = ctx.getImageData(0, 0, width, width)
  const cacheKey = `${width}-${maxIterations}`

  refreshWorker()

  if (cache[cacheKey]) {
    ctx.putImageData(cache[cacheKey], 0, 0)
    return
  }

  startWorker(worker, ctx, cacheKey).postMessage({ canvasImage, width, maxIterations })

  return new Promise(resolve => {
    notifier.addEventListener(DRAW_FINISH, resolve)
  })
}
