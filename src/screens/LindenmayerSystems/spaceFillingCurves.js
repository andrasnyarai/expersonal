import { padding } from './constants'

export default {
  'Hilbert curve': {
    axiom: 'A',
    productionRules: { A: '-BF+AFA+FB-', B: '+AF-BFB-FA+' },
    degree: 90,
    maxGeneration: 8,
    calculateStartingPosition: w => {
      return { x: padding, y: w - padding }
    },
  },
  'Peano curve': {
    axiom: 'X',
    productionRules: { X: 'XFYFX+F+YFXFY-F-XFYFX', Y: 'YFXFY-F-XFYFX+F+YFXFY' },
    degree: 90,
    maxGeneration: 5,
    calculateStartingPosition: () => {
      return { x: padding, y: padding }
    },
  },
  'Heighway triangle': {
    axiom: 'F+F+F',
    productionRules: { F: 'F-F+F' },
    degree: 120,
    maxGeneration: 8,
    calculateStartingPosition: (w, g, l) => {
      const adjustMap = {
        1: 1,
        2: 0.9,
        3: 1,
        4: 1,
        5: 1,
        6: 8.5,
        7: 33.5,
        8: 76,
      }
      return {
        x: g < 3 ? padding : w - padding - 5 * l,
        y: w - padding - adjustMap[g] * l,
      }
    },
  },
  'Quadratic snowflake': {
    axiom: 'FF+FF+FF+FF',
    productionRules: { F: 'F+F-F-F+F' },
    degree: 90,
    maxGeneration: 5,
    calculateStartingPosition: () => {
      return { x: padding, y: padding }
    },
  },
  'Sierpinski arrowhead': {
    axiom: 'YF',
    productionRules: { X: 'YF+XF+Y', Y: 'XF-YF-X' },
    degree: 60,
    maxGeneration: 10,
    calculateStartingPosition: (w, g) => {
      return g % 2 === 0 ? { x: padding, y: padding } : { x: padding, y: w - padding }
    },
  },
  Pentaplexity: {
    axiom: 'F++F++F++F++F',
    productionRules: { F: 'F++F++F|F-F++F' },
    degree: 36,
    maxGeneration: 6,
    calculateStartingPosition: w => {
      return { x: (w - padding) / 4.75, y: padding }
    },
  },
  'Sierpinski square': {
    axiom: 'F+XF+F+XF',
    productionRules: { X: 'XF-F+F-XF+F+XF-F+F-X' },
    degree: 90,
    maxGeneration: 8,
    calculateStartingPosition: (w, g, l) => {
      return {
        x: (w - padding) / 2 - l / 2 + padding / 2,
        y: padding,
      }
    },
  },
  'Dragon curve': {
    axiom: 'FX',
    productionRules: { X: 'X+YF+', Y: '-FX-Y' },
    degree: 90,
    maxGeneration: 14,
    calculateStartingPosition: (w, g, l) => {
      const adjustMap = {
        3: { x: 1, y: 0 },
        4: { x: 1, y: 1.65 },
        5: { x: 1, y: 4.3 },
        6: { x: 2, y: 5.7 },
        7: { x: 10, y: 12.5 },
        8: { x: 18, y: 15.25 },
        9: { x: 21, y: 8.5 },
        10: { x: 21, y: 6.5 },
        11: { x: 21, y: 12 },
        12: { x: 21, y: 31.5 },
        13: { x: 21, y: 71 },
        14: { x: 42, y: 100 },
      }
      return g < 3
        ? { x: padding, y: padding }
        : {
            x: w - padding - l * adjustMap[g].x,
            y: padding + l * adjustMap[g].y,
          }
    },
  },
  'Lévy C curve': {
    axiom: 'F',
    productionRules: { F: '+F−−F+' },
    degree: 45,
    maxGeneration: 17,
    calculateStartingPosition: (w, g, l) => {
      const adjustMap = {
        2: { x: 0, y: 0 },
        3: { x: 0, y: 0 },
        4: { x: 0, y: 2 },
        5: { x: 0, y: 2.85 },
        6: { x: 2, y: 6 },
        7: { x: 2.9, y: 8.5 },
        8: { x: 6, y: 14 },
        9: { x: 8.5, y: 20 },
        10: { x: 14, y: 30 },
        11: { x: 20, y: 42.5 },
        12: { x: 30, y: 62.5 },
        13: { x: 42, y: 88 },
        14: { x: 60, y: 126 },
        15: { x: 88, y: 179 },
        16: { x: 125, y: 254 },
        17: { x: 180, y: 360 },
      }
      return g < 2
        ? { x: padding, y: padding }
        : {
            x: w - padding - l * adjustMap[g].x,
            y: padding + l * adjustMap[g].y,
          }
    },
  },
  Anklet: {
    axiom: '-X--X',
    productionRules: { X: 'XFX--XFX' },
    degree: 45,
    maxGeneration: 9,
    calculateStartingPosition: w => {
      return { x: w / 2, y: w - padding }
    },
  },
  'Gosper curve': {
    axiom: 'XF',
    productionRules: { X: 'X+YF++YF-FX--FXFX-YF+', Y: '-FX+YFYF++YF+FX--FX-Y' },
    degree: 60,
    maxGeneration: 6,
    calculateStartingPosition: (w, g, l) => {
      const adjustMap = {
        1: { x: 0.3, y: padding },
        2: { x: 0.36, y: padding },
        3: { x: 0.5, y: padding },
        4: { x: 0.65, y: padding },
        5: { x: 0.78, y: w * 0.107 },
        6: { x: 0.9, y: w * 0.23 },
      }
      return {
        x: w * adjustMap[g].x,
        y: adjustMap[g].y,
      }
    },
  },
  'Quadratic Gosper': {
    axiom: '-YF',
    productionRules: {
      X: 'XFX-YF-YF+FX+FX-YF-YFFX+YF+FXFXYF-FX+YF+FXFX+YF-FXYF-YF-FX+FX+YFYF-',
      Y: '+FXFX-YF-YF+FX+FXYF+FX-YFYF-FX-YF+FXYFYF-FX-YFFX+FX+YF-YF-FX+FX+YFY',
    },
    degree: 90,
    maxGeneration: 4,
    calculateStartingPosition: w => {
      return { x: padding, y: w - padding }
    },
  },
  'Cesàro curve': {
    axiom: 'F',
    productionRules: { F: 'F+F--F+F' },
    degree: 85,
    maxGeneration: 8,
    calculateStartingPosition: () => {
      return { x: padding, y: padding }
    },
  },
  Pentadendrite: {
    axiom: 'F-F-F-F-F',
    productionRules: { F: 'F-F-F++F+F-F' },
    degree: 72,
    maxGeneration: 5,
    calculateStartingPosition: (w, g) => {
      const adjustMap = {
        1: w * 0.17,
        2: w * 0.075,
        3: 0,
        4: w * -0.076,
        5: w * -0.19,
      }
      return {
        x: (w - padding) / 2 - adjustMap[g],
        y: w - padding,
      }
    },
  },
}
