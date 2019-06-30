import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGesture } from 'react-with-gesture'
import { useSpring, config } from 'react-spring'

import Tracker from './Tracker'
import Pointer from './Pointer'
import { HUNDRED_PERCENT, POINTER_WIDTH_PERCENT, SLIDER_HEIGHT } from './constants'
import { SET_DEPTH } from './../../constants/actionNames'

const Container = styled.div`
  background-color: white;
  height: ${SLIDER_HEIGHT}px;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 3vw;
  user-select: none;
  cursor: crosshair;
`

function calculateXPercent(xy, containerRef) {
  const [x] = xy
  const leftOffset = containerRef.current.offsetLeft
  const containerWidth = containerRef.current.offsetWidth
  const maxPercentPosition = HUNDRED_PERCENT - POINTER_WIDTH_PERCENT
  const xCoordinateInPercent = (HUNDRED_PERCENT * (x - leftOffset)) / containerWidth

  let xRelativeToPointer = xCoordinateInPercent - POINTER_WIDTH_PERCENT / 2
  if (xRelativeToPointer < 0) {
    xRelativeToPointer = 0
  } else if (xRelativeToPointer > maxPercentPosition) {
    xRelativeToPointer = maxPercentPosition
  }
  return xRelativeToPointer
}

function calculateDepth(currentXPercent, maxRange) {
  const quadrant = (HUNDRED_PERCENT - POINTER_WIDTH_PERCENT) / (maxRange - 1)
  const activationFineBalance = 0.02
  return Math.ceil(currentXPercent / quadrant + activationFineBalance)
}

export default function Slider({ className, currentDepth, dispatch, maxRange, fractalName }) {
  const containerRef = useRef()
  const [handlers, { xy }] = useGesture()
  const [currentXPercent, setCurrentXPercent] = useState(0)
  const [props, setLeft] = useSpring(() => ({
    left: `calc(${currentXPercent}%)`,
    config: config.stiff,
  }))

  useEffect(() => {
    const newXPercent = calculateXPercent(xy, containerRef)
    setCurrentXPercent(newXPercent)
    setLeft({ left: `calc(${newXPercent}%)` })
  }, [xy, setLeft])

  useEffect(() => {
    const depth = calculateDepth(currentXPercent, maxRange)
    dispatch({ type: SET_DEPTH, payload: depth })
  }, [currentXPercent, maxRange, fractalName, dispatch, setLeft])

  return (
    <Container className={className} ref={containerRef} {...handlers()}>
      <Tracker maxRange={maxRange} currentDepth={currentDepth} />
      <Pointer left={props.left} />
    </Container>
  )
}
