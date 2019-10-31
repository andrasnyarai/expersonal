export default {
  hilbert: {
    axiom: 'A',
    rules: { A: '-BF+AFA+FB-', B: '+AF-BFB-FA+' },
    degree: 90,
    calculateStartingPosition: w => {
      return { x: 0, y: w }
    },
  },
  Peano: {
    axiom: 'X',
    rules: { X: 'XFYFX+F+YFXFY-F-XFYFX', Y: 'YFXFY-F-XFYFX+F+YFXFY' },
    degree: 90,
    calculateStartingPosition: () => {
      return { x: 0, y: 0 }
    },
  },
  Heighway: {
    axiom: 'F+F+F',
    rules: { F: 'F-F+F' },
    degree: 120,
    calculateStartingPosition: (w, n, l) => {
      return { x: n < 3 ? 0 : w - 5 * l, y: w - l }
    },
  },
  QuadraticSnowflake: {
    axiom: 'FF+FF+FF+FF',
    rules: { F: 'F+F-F-F+F' },
    degree: 90,
    calculateStartingPosition: () => {
      return { x: 0, y: 0 }
    },
  },
  SierpinskiArrowhead: {
    axiom: 'YF',
    rules: { X: 'YF+XF+Y', Y: 'XF-YF-X' },
    degree: 60,
    calculateStartingPosition: (w, n) => {
      return n % 2 === 0 ? { x: 0, y: 0 } : { x: 0, y: w }
    },
  },
  Pentaplexity: {
    axiom: 'F++F++F++F++F',
    rules: { F: 'F++F++F|F-F++F' },
    degree: 36,
    calculateStartingPosition: w => {
      return { x: w / 5.25, y: 0 }
    },
  },
  SierpinskiSquare: {
    axiom: 'F+XF+F+XF',
    rules: { X: 'XF-F+F-XF+F+XF-F+F-X' },
    degree: 90,
    calculateStartingPosition: (w, n, l) => {
      return { x: w / 2 - l / 2, y: 0 }
    },
  },
  dragon: {
    axiom: 'FX',
    rules: { X: 'X+YF+', Y: '-FX-Y' },
    degree: 90,
    calculateStartingPosition: () => {
      return { x: 0, y: 0 }
    },
  },
  levy: {
    axiom: 'F',
    rules: { F: '+F−−F+' },
    degree: 45,
    calculateStartingPosition: () => {
      return { x: 0, y: 0 }
    },
  },
  anklet: {
    axiom: '-X--X',
    rules: { X: 'XFX--XFX' },
    degree: 45,
    calculateStartingPosition: w => {
      return { x: w / 2, y: w }
    },
  },
  gosper: {
    axiom: 'XF',
    rules: { X: 'X+YF++YF-FX--FXFX-YF+', Y: '-FX+YFYF++YF+FX--FX-Y' },
    degree: 60,
    calculateStartingPosition: (w, n, l) => {
      return { x: { 1: 1.5, 2: 3, 3: 10.5 }[n] * l, y: 0 }
    },
  },
  quadraticgosper: {
    axiom: '-YF',
    rules: {
      X: 'XFX-YF-YF+FX+FX-YF-YFFX+YF+FXFXYF-FX+YF+FXFX+YF-FXYF-YF-FX+FX+YFYF-',
      Y: '+FXFX-YF-YF+FX+FXYF+FX-YFYF-FX-YF+FXYFYF-FX-YFFX+FX+YF-YF-FX+FX+YFY',
    },
    degree: 90,
    calculateStartingPosition: w => {
      return { x: 0, y: w }
    },
  },
  cesaro: {
    axiom: 'F',
    rules: { F: 'F+F--F+F' },
    degree: 85,
    calculateStartingPosition: () => {
      return { x: 0, y: 0 }
    },
  },
  pentadendrite: {
    axiom: 'F-F-F-F-F',
    rules: { F: 'F-F-F++F+F-F' },
    degree: 72,
    calculateStartingPosition: (w, n, l) => {
      return { x: w / 2 - l + (n % 2 === 0 ? -l : l) / 8, y: w }
    },
  },
}
