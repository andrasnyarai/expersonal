import React, { useEffect, useReducer, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import useResizeObserver from 'use-resize-observer'

import { Selector, Slider } from './components'
import fractals from './fractals'

import { MEDIUM, LARGE } from './constants/mediaQueries'
import { reducer, initialState } from './reducer'

const GlobalStyle = createGlobalStyle`
.grid {
  grid-template: "a a a a a a"
                "a a a a a a"
                "a a a a a a"
                "b b b b b b"
                "c c c c c c"
                / 1fr 1fr 1fr 1fr 1fr 1fr;
                      
  @media (min-width: ${MEDIUM}px) {
    grid-template: "a a a a a b"
                  "a a a a a b"
                  "a a a a a b"
                  "a a a a a b"
                  "c c c c c c"
                  / 1fr 1fr 1fr 1fr 1fr .5fr;
  }
@media (min-width: ${LARGE}px) {
    grid-template: "a a a a b b"
                  "a a a a b b"
                  "a a a a b b"
                  "a a a a b b"
                  "a a a a c c"
                  / 1fr 1fr 1fr 1fr 1fr .5fr;
  }
}
.a {
  grid-area: a;
}
.b {
  grid-area: b;
}
.c {
  grid-area: c;
}
`

const Container = styled.div`
  display: grid;
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
`

const CanvasWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  align-self: center;
  justify-self: center;
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);

  @media (min-width: ${LARGE}px) {
    max-width: 800px;
    max-height: 800px;
  }
`

const Canvas = styled.canvas`
  display: block;
  background-color: white;
  mix-blend-mode: hard-light;
  max-width: inherit;
  max-height: inherit;
`

function canvasSetup(context, width) {
  context.clearRect(0, 0, width, width)
  context.fillStyle = 'rgba(0,0,0,0.5)'
  context.strokeStyle = 'rgba(0,0,0,0.5)'
}

function draw(canvasRef, width, depth, fractalName) {
  const canvas = canvasRef.current
  if (canvas.getContext) {
    const context = canvas.getContext('2d')
    canvasSetup(context, width)
    fractals[fractalName].draw(context, width, Number(depth))
  }
}

export default function HausdorffDimensions() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [resizeRef, width] = useResizeObserver()
  const canvasRef = useRef()

  useEffect(() => {
    const { calculating, currentFractalName, currentDepth } = state
    if (!calculating) {
      draw(canvasRef, width, currentDepth, currentFractalName)
    }
  }, [width, state, canvasRef])

  return (
    <>
      <GlobalStyle />
      <Container className="grid" ref={resizeRef}>
        <CanvasWrapper className="a" width={width} height={width}>
          <Canvas id="canvas" ref={canvasRef} width={width} height={width} />
        </CanvasWrapper>
        <Selector className="b" current={state.currentFractalName} dispatch={dispatch} />
        <Slider
          className="c"
          currentDepth={state.currentDepth}
          dispatch={dispatch}
          maxRange={fractals[state.currentFractalName].maxDepth}
          fractalName={state.currentFractalName}
        />
      </Container>
    </>
  )
}
