import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

import { POINTER_WIDTH_PERCENT } from './constants'

const PointerBody = styled(animated.div)`
  width: ${POINTER_WIDTH_PERCENT}%;
  height: 25px;
  position: absolute;
  position: absolute;
  display: flex;
  justify-content: center;
`

const Marker = styled.div`
  width: 10px;
  height: ${({ compact }) => (compact ? 50 : 70)}px;
  position: absolute;
  background-color: black;
  bottom: -15px;
  position: absolute;
  clip-path: polygon(50% 0%, 85% 85%, 50% 100%, 15% 85%);
`

const Weight = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: red;
  opacity: 0.7;
  bottom: -33px;
  border-radius: 50%;
`

function Spiral({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-20 10 744 952">
      <path
        d="m351 487c0 8-11 4-14-1-6-11 4-24 15-27 19-5 37 11 40 30 4 27-18 50-44 53-35 4-64-25-66-59-3-42 32-77 73-79 50-3 90 39 92 88 2 57-46 104-102 105-65 2-117-53-119-117-1-72 60-131 131-132 80-1 144 67 145 146 1 87-74 158-160 158-95 0-171-81-171-175 0-102 88-185 190-184 110 1 198 95 197 204C557 615 456 709 340 708 215 706 115 598 117 475 119 342 233 236 364 238 504 240 616 361 614 500 611 648 484 766 337 763 182 760 58 626 61 472 65 309 206 179 367 183c170 4 306 151 302 320-4 178-158 319-335 315"
        fill="none"
        stroke="black"
        strokeWidth="10"
      />
    </svg>
  )
}

const SpiralWrapper = styled(Spiral)`
  position: absolute;
  bottom: -40px;
  animation: rotate linear 2.5s infinite;

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(-360deg);
    }
  }
`

export default function Pointer({ left, compact }) {
  return (
    <PointerBody style={{ left }}>
      <Marker compact={compact} />
      {!compact && <Weight />}
      {!compact && <SpiralWrapper />}
    </PointerBody>
  )
}
