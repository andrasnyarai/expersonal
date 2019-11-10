import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { HUNDRED_PERCENT, POINTER_WIDTH_PERCENT } from './constants'

const TrackerBody = styled.div`
  width: 100%;
  height: 25px;
  background-color: white;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
`

const Diamond = styled.div`
  position: absolute;
  clip-path: polygon(50% 0, 85% 50%, 50% 100%, 15% 50%);
  width: 7.5px;
  height: 10px;
  display: inline-flex;
  transform: translateX(-50%);
`

const DiamondWrapper = styled.div`
  transition: all 0.2s ease;
  position: absolute;
  left: 100%;
  opacity: 0.7;
  filter: ${({ on }) => (on ? 'drop-shadow(#4f5ecc 0px 0px 2px)' : 'unset')};
  ${Diamond} {
    background-color: ${({ on }) => (on ? 'blue' : 'black')};
  }
`

function calculateFromLeftPercent(total, index) {
  return POINTER_WIDTH_PERCENT / 2 + ((HUNDRED_PERCENT - POINTER_WIDTH_PERCENT) / (total - 1)) * index
}

function Delimiter({ leftOffset, on }) {
  const measuredRef = useRef()
  useEffect(() => {
    measuredRef.current.style.left = `${leftOffset}%`
  }, [leftOffset])
  return (
    <DiamondWrapper ref={measuredRef} on={on ? 1 : 0}>
      <Diamond />
    </DiamondWrapper>
  )
}

function createDelimiters(total, currentDepth) {
  return Array(total)
    .fill()
    .map((_, i) => {
      const leftOffset = calculateFromLeftPercent(total, i)
      const on = i < currentDepth
      return <Delimiter key={i} leftOffset={leftOffset} on={on} />
    })
}

export default function Tracker({ maxRange, currentDepth }) {
  return <TrackerBody>{createDelimiters(maxRange, currentDepth)}</TrackerBody>
}
