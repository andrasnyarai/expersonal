import React, { useState, useEffect, useReducer, useRef } from 'react'

import styled, { createGlobalStyle } from 'styled-components'
import useResizeObserver from 'use-resize-observer'

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
  max-width: 600px;
  max-height: 600px;
  align-self: center;
  justify-self: center;
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
`

// Hilbert curve (L -> +RF-LFL-FR+, R -> -LF+RFR+FL-):

const degree = 90
let axiom = 'A'

const productionRules = {
  A: '-BF+AFA+FB-',
  B: '+AF-BFB-FA+',
}

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
// const cubicRatio = 0
let directions = ['e', 's', 'w', 'n']
let currentDirectionIndex = 0
let direction = directions[0]
export default function LindenmayerSystem() {
  const [resizeRef, width] = useResizeObserver()
  const [depth, setDepth] = useState(2)
  // const [currentDirectionIndex, setCurrentDirectionIndex] = useState(0)

  const canvasRef = useRef()

  let [maxXPosition, setMaxPosition] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas.getContext) {
      const context = canvas.getContext('2d')

      context.beginPath()
      context.moveTo(0, width)
      context.translate(0, width)

      iterateSymbols(depth, axiom)
        .split('')
        .map(symbol => {
          if (symbol === 'F') {
            if (direction === 'e') {
              setMaxPosition(x => x + 1)
            }
            if (direction === 'n') {
              maxYPosition += 1
            }
            //---
            if (direction === 'w') {
              setMaxPosition(x => x - 1)
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
        .forEach(symbol => {
          if (symbol === 'F') {
            console.log(width, maxXPosition)

            context.lineTo(width / maxXPosition, 0)
            context.translate(width / maxXPosition, 0)
          }
          if (symbol === '-') {
            context.rotate((-degree * Math.PI) / 180)
          }
          if (symbol === '+') {
            context.rotate((degree * Math.PI) / 180)
          }
        })
      context.stroke()
    }
  }, [width, canvasRef, depth])

  return (
    <>
      <CanvasWrapper ref={resizeRef}>
        <Canvas ref={canvasRef} height={width} width={width} />
      </CanvasWrapper>
      {/* <input type="range" min="0" max="7" value={depth} onChange={e => setDepth(e.target)} step="1" /> */}
    </>
  )
}
