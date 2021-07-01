export function map(value, [minFrom, maxFrom], [minTo, maxTo]) {
  return ((value - minFrom) * (maxTo - minTo)) / (maxFrom - minFrom) + minTo
}

export function lerp(alpha, min, max) {
  return min * (1 - alpha) + max * alpha
}

export function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max))
}

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
