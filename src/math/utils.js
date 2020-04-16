function map(value, [minFrom, maxFrom], [minTo, maxTo]) {
  return ((value - minFrom) * (maxTo - minTo)) / (maxFrom - minFrom) + minTo
}

function lerp(alpha, min, max) {
  return min * (1 - alpha) + max * alpha
}

export { map, lerp }
