/*
monkeys tree https://archive.is/20020921135308/http://www.coaauw.org/boulder-eyh/eyh_fractal.html
*/

export default {
  Hilbert: { axiom: 'A', rules: { A: '-BF+AFA+FB-', B: '+AF-BFB-FA+' }, degree: 90 },
  Peano: { axiom: 'X', rules: { X: 'XFYFX+F+YFXFY-F-XFYFX', Y: 'YFXFY-F-XFYFX+F+YFXFY' }, degree: 90 },
  SierpinskiArrowhead: { axiom: 'X', rules: { X: 'YF+XF+Y', Y: 'XF-YF-X' }, degree: 60 },
  SierpinskiQuadratic: { axiom: 'F+XF+F+XF', rules: { X: 'XF-F+F-XF+F+XF-F+F-X' }, degree: 90 },
  dragon: { axiom: 'FX', rules: { X: 'X+YF+', Y: '-FX-Y' }, degree: 90 },
  levy: { axiom: 'F', rules: { F: '+F−−F+' }, degree: 45 },
  hexagosper: { axiom: 'XF', rules: { X: 'X+YF++YF-FX--FXFX-YF+', Y: '-FX+YFYF++YF+FX--FX-Y' }, degree: 60 },
  quadraticgosper: {
    axiom: '-YF',
    rules: {
      X: 'XFX-YF-YF+FX+FX-YF-YFFX+YF+FXFXYF-FX+YF+FXFX+YF-FXYF-YF-FX+FX+YFYF-',
      Y: '+FXFX-YF-YF+FX+FXYF+FX-YFYF-FX-YF+FXYFYF-FX-YFFX+FX+YF-YF-FX+FX+YFY',
    },
    degree: 90,
  },
  cesaro: { axiom: 'F', rules: { F: 'F+F--F+F' }, degree: 85 },
  pentadendrite: {
    axiom: 'F-F-F-F-F',
    rules: { F: 'F-F-F++F+F-F' },
    degree: 72,
  },
  islands: { axiom: 'F-F-F-F', rules: { F: 'F-b+FF-F-FF-Fb-FF+b-FF+F+FF+Fb+FFF', b: 'bbbbbb' }, degree: 90 },
}
