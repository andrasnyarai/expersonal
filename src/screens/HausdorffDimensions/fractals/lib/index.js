function radians(degrees) {
  return (degrees * Math.PI) / 180
}

function map(value, [minFrom, maxFrom], [minTo, maxTo]) {
  return ((value - minFrom) * (maxTo - minTo)) / (maxFrom - minFrom) + minTo
}

export { radians, map }
