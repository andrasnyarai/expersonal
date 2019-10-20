import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'
import useResizeObserver from 'use-resize-observer'

import curves from './spaceFillingCurves'
let offset = 0
const Canvas = styled.canvas`
  display: block;
  background-color: white;
  mix-blend-mode: hard-light;
  max-width: inherit;
  max-height: inherit;
`

const CanvasWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 900px;
  align-self: center;
  justify-self: center;
  /* background: -webkit-repeating-radial-gradient(
    circle farthest-corner at 20px 200px,
    rgb(46, 24, 15) 38%,
    rgb(30, 21, 30) 41%,
    rgb(255, 255, 255) 42%,
    #0000ff 42%,
    rgb(86, 201, 65) 44%,
    rgb(0, 0, 0) 46%,
    rgb(51, 51, 193) 52%
  );
  background: -o-repeating-radial-gradient(
    circle farthest-corner at 20px 200px,
    rgb(46, 24, 15) 38%,
    rgb(30, 21, 30) 41%,
    rgb(255, 255, 255) 42%,
    #0000ff 42%,
    rgb(86, 201, 65) 44%,
    rgb(0, 0, 0) 46%,
    rgb(51, 51, 193) 52%
  );
  background: -moz-repeating-radial-gradient(
    circle farthest-corner at 20px 200px,
    rgb(46, 24, 15) 38%,
    rgb(30, 21, 30) 41%,
    rgb(255, 255, 255) 42%,
    #0000ff 42%,
    rgb(86, 201, 65) 44%,
    rgb(0, 0, 0) 46%,
    rgb(51, 51, 193) 52%
  );
  background: repeating-radial-gradient(
    circle farthest-corner at 20px 200px,
    rgb(46, 24, 15) 38%,
    rgb(30, 21, 30) 41%,
    rgb(255, 255, 255) 42%,
    #0000ff 42%,
    rgb(86, 201, 65) 44%,
    rgb(0, 0, 0) 46%,
    rgb(51, 51, 193) 52%
  ); */
`

let degree = curves['cesaro'].degree
let axiom = curves['cesaro'].axiom
let productionRules = curves['cesaro'].rules

function iterateSymbols(depth, instructionSymbols) {
  if (depth === 0) {
    return instructionSymbols
  }

  const nextInstructionSymbols = instructionSymbols
    .split('')
    .map(symbol => {
      if (productionRules[symbol]) {
        return productionRules[symbol]
      }
      return symbol
    })
    .join('')

  depth -= 1
  // console.log(nextInstructionSymbols)
  return iterateSymbols(depth, nextInstructionSymbols)
}

// function calculatePoints(x, y, length, angles) {
//     let lastX = x
//     let lastY = y
//     return angles.map(angle => {
//       const nextX = lastX + length * Math.cos(radians(angle))
//       const nextY = lastY + length * Math.sin(radians(angle))
//       lastX = nextX
//       lastY = nextY
//       return [nextX, nextY]
//     })
//   }

let maxYPosition = 0
let maxXPosition = 0
// const cubicRatio = 0
let directions = ['e', 's', 'w', 'n']
let currentDirectionIndex = 0
let direction = directions[0]

function canvasSetup(context, width) {
  context.fillStyle = 'rgba(255,255,255, 1)'
  context.fillRect(0, 0, width, width)
  // context.strokeStyle = 'rgba(0,0,0,0.5)'
}

export default function LindenmayerSystem() {
  const [resizeRef, width] = useResizeObserver()
  const [depth, setDepth] = useState(2)
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current

    if (width > 1 && canvas.getContext) {
      const context = canvas.getContext('2d')

      maxYPosition = 0
      maxXPosition = 0
      currentDirectionIndex = 0
      direction = directions[0]

      context.resetTransform()
      canvasSetup(context, width)

      // context.moveTo(0, width)
      // context.translate(0, width)
      context.beginPath()
      context.moveTo(width / 2, width / 2)
      context.translate(width / 2, width / 2)

      iterateSymbols(depth, axiom)
        .split('')
        .map(symbol => {
          if (symbol === 'F') {
            if (direction === 'e') {
              maxXPosition += 1
            }
            if (direction === 'n') {
              maxYPosition += 1
            }
            //---
            if (direction === 'w') {
              maxXPosition -= 1
            }
            if (direction === 's') {
              maxYPosition -= 1
            }
          }
          if (symbol === '-') {
            currentDirectionIndex = (currentDirectionIndex - 1 + directions.length) % directions.length
            direction = directions[currentDirectionIndex]
          }
          if (symbol === '+') {
            // on this direction its maybe dont neeeded!?
            currentDirectionIndex = (currentDirectionIndex + 1 + directions.length) % directions.length
            direction = directions[currentDirectionIndex]
          }
          return symbol
        })
        .forEach((symbol, i, finalAxiom) => {
          if (symbol === 'F') {
            function draw() {
              const fromOrigo = finalAxiom.slice(0, i + 1).filter(a => /F/.test(a))
              const di = fromOrigo.length
              const r = 50
              const g = 0
              const b = di * 10
              const a = 1

              context.beginPath()
              context.moveTo(0, 0)
              context.lineTo(25, 0)
              context.translate(25, 0)
              const t = `rgb(${[255, g, b].join(',')})`
              // console.log(t)
              context.strokeStyle = t

              // context.lineDashOffset = -offset
              context.setLineDash([4, 2])
              // context.lineTo(width / maxXPosition, 0)
              // context.translate(width / maxXPosition, 0)
              context.lineWidth = Math.tan(di)
              context.stroke()
            }

            // function march() {
            //   offset++
            //   if (offset > 16) {
            //     offset = 0
            //   }
            // draw()
            // setTimeout(march, 20)
            // }

            draw()
            // setTimeout(draw, 1000)
            // }
            // if (offset > 16) {
            //   offset = 0
            // }
          }
          if (symbol === 'b') {
            context.moveTo(25, 0)
            context.translate(25, 0)
          }
          if (symbol === '-') {
            context.rotate((-degree * Math.PI) / 180)
          }
          if (symbol === '+') {
            context.rotate((degree * Math.PI) / 180)
          }
        })
    }
  }, [width, canvasRef, depth])

  return (
    <>
      <CanvasWrapper ref={resizeRef}>
        <Canvas ref={canvasRef} height={width} width={width} />
      </CanvasWrapper>
      <input type="range" min={1} max={3} step={1} value={depth} onChange={e => setDepth(Number(e.target.value))} />
      <select
        onChange={e => {
          const selected = e.target.value

          degree = curves[selected].degree
          axiom = curves[selected].axiom
          productionRules = curves[selected].rules
        }}
      >
        {Object.keys(curves).map(curve => (
          <option key={curve}>{curve}</option>
        ))}
      </select>
    </>
  )
}
