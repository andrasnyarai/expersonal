import { drawSpaceFillingCurve } from './hooks'
import curves from './spaceFillingCurves'

const defaults = {
  calculating: false,
  clearBeforeDraw: true,
  clearRemainingAnimations: false,
  drawFull: true,
  darkMode: true,
}

export const tileDrawMap = {
  curveName: (canvasRef, optionName) => {
    drawSpaceFillingCurve(70, canvasRef, {
      curve: curves[optionName],
      curveName: optionName,
      generation: 3,
      gradientName: 'Chaplin’s pixel',
      lineWidthStyle: 'log',
      compositeOperation: 'darken',
      lineCaps: 'round',
      ...defaults,
    })
  },
  compositeOperation: (canvasRef, optionName) => {
    drawSpaceFillingCurve(50, canvasRef, {
      curve: curves['Anklet'],
      curveName: 'Anklet',
      generation: 3,
      gradientName: 'Clean pupil',
      lineWidthStyle: 'fround',
      compositeOperation: optionName,
      lineCaps: 'square',
      ...defaults,
    })
    const context = canvasRef.current.getContext('2d')
    Array(5)
      .fill()
      .forEach(() => {
        const arcs = [
          {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 30,
            shadowColor: 'rgba(200,0,0,0.2)',
            positions: [0, 12, 12, 0],
          },
          {
            shadowBlur: 14,
            shadowOffsetX: 5,
            shadowOffsetY: -30,
            shadowColor: 'rgba(0,200,0,1)',
            positions: [12, 34, 12, 0],
          },
          {
            shadowBlur: 20,
            shadowOffsetX: -10,
            shadowOffsetY: -15,
            shadowColor: 'rgba(0,0,200,.5)',
            positions: [33, 33, 5, 0],
          },
        ]

        const rects = [
          { fillStyle: 'rgba(75,0,0,1)', positions: [15, 5, 65, 25] },
          { fillStyle: 'rgba(255,255,255,1)', positions: [7.5, 7.5, 5, 25] },
        ]

        context.fillStyle = 'rgba(0,0,0,1)'
        context.globalCompositeOperation = optionName

        arcs.forEach(({ shadowBlur, shadowOffsetX, shadowOffsetY, shadowColor, positions }) => {
          context.shadowBlur = shadowBlur
          context.shadowOffsetX = shadowOffsetX
          context.shadowOffsetY = shadowOffsetY
          context.shadowColor = shadowColor

          context.arc(...positions, 2 * Math.PI)
          context.fill()
        })

        context.shadowBlur = 0
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0

        arcs.forEach(({ shadowBlur, shadowOffsetX, shadowOffsetY, shadowColor, positions }) => {
          context.shadowBlur = shadowBlur
          context.shadowOffsetX = shadowOffsetX
          context.shadowOffsetY = shadowOffsetY
          context.shadowColor = shadowColor

          context.arc(...positions, 2 * Math.PI)
          context.fill()
        })

        rects.forEach(({ fillStyle, positions }) => {
          context.fillStyle = fillStyle
          context.fillRect(...positions)
        })
      })
  },
  gradientName: (canvasRef, optionName) => {
    drawSpaceFillingCurve(70, canvasRef, {
      curve: curves['Peano curve'],
      curveName: 'Peano curve',
      generation: 3,
      gradientName: optionName,
      lineWidthStyle: 'fround',
      compositeOperation: 'xor',
      lineCaps: 'square',
      ...defaults,
    })
  },
  lineWidthStyle: (canvasRef, optionName) => {
    drawSpaceFillingCurve(50, canvasRef, {
      curve: curves['Dragon curve'],
      curveName: 'Dragon curve',
      generation: 7,
      gradientName: 'Chaplin’s pixel',
      lineWidthStyle: optionName,
      compositeOperation: 'xor',
      lineCaps: 'square',
      ...defaults,
    })
  },
  lineCaps: (canvasRef, optionName) => {
    drawSpaceFillingCurve(120, canvasRef, {
      curve: curves['Hilbert curve'],
      curveName: 'Hilbert curve',
      generation: 2,
      gradientName: 'Chaplin’s pixel',
      lineWidthStyle: 'sqrt',
      compositeOperation: 'xor',
      lineCaps: optionName,
      ...defaults,
    })
  },
}
