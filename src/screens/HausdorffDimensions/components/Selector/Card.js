import React, { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'

import fractals from '../../fractals'
import { SET_FRACTAL_NAME } from '../../constants/actionNames'
import { CARD_SIZE } from './constants'

const pixelManipulated = ['Mandelbrot Set']

const CardBody = styled.div`
  border: 0.5px dotted black;
  border-radius: 5px;
  box-sizing: border-box;
  position: relative;
  scroll-snap-align: center;
  display: inline-block;
  width: ${CARD_SIZE}px;
  height: ${CARD_SIZE}px;
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: 0.25s all ease;
  user-select: none;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 1px 5px 3px #ccc;
  }
  @media (hover: none) {
    &:hover {
      transform: unset;
      box-shadow: unset;
    }
  }
`

const Marker = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: black;
  opacity: 0.5;
  transition: all 0.25s ease;
  clip-path: ${({ selected }) =>
    selected ? 'polygon(100% 0, 25% 50%, 100% 100%);' : 'polygon(100% 0, 100% 50%, 100% 100%)'};
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`

const CardTitle = styled.div`
  font-weight: 200;
  position: absolute;
  bottom: 0px;
  margin: 0px;
  left: 1px;
`

function drawToCardsCanvas(ref) {
  const canvas = ref.current
  const fractalName = ref.current.id
  if (canvas.getContext) {
    const context = canvas.getContext('2d')
    context.fillStyle = 'rgba(0,0,0,0.5)'
    context.strokeStyle = 'rgba(0,0,0,0.5)'
    context.translate(-30, -30)

    const { width: canvasSize } = canvas.getBoundingClientRect()
    const depth = pixelManipulated.includes(fractalName) ? 1 : 5
    fractals[fractalName].draw(context, canvasSize, depth)
  }
}

export default function Card({ dispatch, current, name }) {
  function onClick() {
    dispatch({ type: SET_FRACTAL_NAME, payload: name })
  }

  const ref = useRef()

  useLayoutEffect(() => {
    drawToCardsCanvas(ref)
  }, [ref])

  return (
    <CardBody onClick={onClick} key={name}>
      <Marker selected={current === name} />
      <CardTitle>{name}</CardTitle>
      <canvas
        ref={ref}
        id={name}
        {...(pixelManipulated.includes(name)
          ? {
              width: 50,
              height: 50,
              style: {
                position: 'absolute',
                left: '1px',
                top: '1px',
              },
            }
          : {
              width: 75,
              height: 75,
            })}
      />
    </CardBody>
  )
}
