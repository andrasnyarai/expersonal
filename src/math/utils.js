function map(value, [minFrom, maxFrom], [minTo, maxTo]) {
  return ((value - minFrom) * (maxTo - minTo)) / (maxFrom - minFrom) + minTo
}

function lerp(alpha, min, max) {
  return min * (1 - alpha) + max * alpha
}

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max))
}

export { map, lerp, clamp, percentage }
