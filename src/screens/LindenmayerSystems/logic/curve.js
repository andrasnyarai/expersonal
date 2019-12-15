function iterateSymbols(depth, instructionSymbols, productionRules) {
  if (depth === 0) {
    return instructionSymbols
  }

  const nextInstructionSymbols = instructionSymbols
    .split('')
    .map(symbol => productionRules[symbol] || symbol)
    .join('')

  depth -= 1
  return iterateSymbols(depth, nextInstructionSymbols, productionRules)
}

function convertSymbolsToSpatialPoints(symbols, degree) {
  const pointTracker = { x: 0, y: 0 }
  const aStep = (degree * Math.PI) / 180

  let maxX = 0
  let minX = 0
  let maxY = 0
  let minY = 0
  let a = 0
  const points = []

  symbols.forEach(symbol => {
    if (symbol === 'F') {
      pointTracker.x += Number(Math.cos(a).toFixed(5))
      pointTracker.y += Number(Math.sin(a).toFixed(5))
      maxX = Math.max(pointTracker.x, maxX)
      minX = Math.min(pointTracker.x, minX)
      maxY = Math.max(pointTracker.y, maxY)
      minY = Math.min(pointTracker.y, minY)

      points.push({ ...pointTracker })
    }
    if (symbol === '-') {
      a -= aStep
    }
    if (symbol === '|') {
      a -= Math.PI
    }
    if (symbol === '+') {
      a += aStep
    }
  })

  return {
    points,
    boundaries: {
      maxX,
      minX,
      maxY,
      minY,
    },
  }
}

export function calculateCurve(generation, curve) {
  const { axiom, productionRules, degree } = curve
  const symbols = iterateSymbols(generation, axiom, productionRules).split('')
  return convertSymbolsToSpatialPoints(symbols, degree)
}
