export const padding = 15

export const easeGradients = index => {
  const ascendingChannel = 55 + index
  const descendingChannel = 255 - index
  const halvingChannel = index / 2
  const doublingChannel = Math.max(255, index * 2)

  return {
    'Polar shift': [descendingChannel, halvingChannel / 5, ascendingChannel],
    'Moss pillow': [15, halvingChannel, 45],
    'Melting berg': [halvingChannel, descendingChannel, descendingChannel],
    'Chaplin’s pixel': [ascendingChannel - 55, ascendingChannel - 55, ascendingChannel - 55],
    'Armor face': [descendingChannel, 25, 24],
    'Clean pupil': [descendingChannel - 20, doublingChannel * 0.7, doublingChannel],
    'Soft skin': [doublingChannel * 0.5, halvingChannel * 1.6, ascendingChannel + 20],
    'Sweater knot': [descendingChannel - 125, ascendingChannel / 2.5, halvingChannel + 5],
    'Sicilian erupt': [doublingChannel, ascendingChannel, halvingChannel],
    'Jungle paw': [50, ascendingChannel, halvingChannel],
    'Sheet lullaby': [ascendingChannel, halvingChannel, halvingChannel],
    'Gauguin’s swimwear': [halvingChannel * 0.2, ascendingChannel, descendingChannel],
  }
}

export const gradientNames = Object.keys(easeGradients())

export const compositeOperations = [
  'source-over', // filter down
  'source-in',
  'source-out',
  'source-atop',
  'destination-over',
  'destination-in',
  'destination-out',
  'destination-atop',
  'lighter',
  'copy',
  'xor',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]

export const lineCaps = ['butt', 'round', 'square']
