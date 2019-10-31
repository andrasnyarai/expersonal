import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'
import useResizeObserver from 'use-resize-observer'

import curves from './spaceFillingCurves'

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

let degree = curves['hilbert'].degree
let axiom = curves['hilbert'].axiom
let productionRules = curves['hilbert'].rules
let startingPosition = curves['hilbert'].calculateStartingPosition

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

let a = 0
let aStep = (degree * Math.PI) / 180

let maxX = 0
let minX = 0
let maxY = 0
let minY = 0

let point = { x: 0, y: 0 }

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

      a = 0
      maxX = 0
      minX = 0
      maxY = 0
      minY = 0
      point = { x: 0, y: 0 }

      context.resetTransform()
      canvasSetup(context, width)

      // context.moveTo(0, width)
      // context.translate(0, width)

      const points = iterateSymbols(depth, axiom)
        .split('')
        .map(symbol => {
          if (symbol === 'F') {
            point.x += Number(Math.cos(a).toFixed(5))
            point.y += Number(Math.sin(a).toFixed(5))
            maxX = Math.max(point.x, maxX)
            minX = Math.min(point.x, minX)
            maxY = Math.max(point.y, maxY)
            minY = Math.min(point.y, minY)

            return { ...point }
          }
          if (symbol === '-') {
            a -= aStep
          }
          if (symbol === '|') {
            a -= Math.PI
          }
          if (symbol === '+') {
            a += aStep
          }
          return null
        })
        .filter(Boolean)

      const segmentLength = width / (maxX - minX) // this will be true only for square like structures
      const { x: startX, y: startY } = startingPosition(width, depth, segmentLength)
      context.beginPath()
      context.moveTo(startX, startY)
      context.translate(startX, startY)

      points.forEach((point, i) => {
        function draw() {
          const di = i
          const r = 255
          const g = 0
          const b = di * 10

          var xRatio = width / (maxX - minX)
          var yRatio = width / (maxY - minY)

          let x = point.x * xRatio
          let y = point.y * yRatio

          if (i > 0) {
            const prevPoint = points[i - 1]
            console.log(prevPoint)
            //context.translate(prevPoint.x, prevPoint.y)
            context.beginPath()
            context.moveTo(prevPoint.x * xRatio, prevPoint.y * yRatio)
          }

          context.lineTo(x, y)

          context.strokeStyle = `rgb(${[r, g, b].join(',')})`

          //context.setLineDash([4, 2])

          context.lineWidth = 5 //Math.log(Math.tan(di))
          context.stroke()
          //context.stroke()
        }

        // do RaF
        setTimeout(draw, 10 * i)
      })
    }
  }, [width, canvasRef, depth])

  return (
    <>
      <CanvasWrapper ref={resizeRef}>
        <Canvas ref={canvasRef} height={width} width={width} />
      </CanvasWrapper>
      <input
        type="range"
        min={1}
        max={3}
        step={1}
        value={depth}
        onChange={e => {
          setDepth(Number(e.target.value))
        }}
      />
      <select
        onChange={e => {
          const selected = e.target.value

          degree = curves[selected].degree
          aStep = (degree * Math.PI) / 180
          axiom = curves[selected].axiom
          productionRules = curves[selected].rules
          startingPosition = curves[selected].calculateStartingPosition
        }}
      >
        {Object.keys(curves).map(curve => (
          <option key={curve}>{curve}</option>
        ))}
      </select>
    </>
  )
}
