import React from 'react'
import styled from 'styled-components'

const side = '100px'
const halfSide = '50px'

function createRadarKeyframes() {
  const clipPathPoints = [
    `${halfSide} ${halfSide}`,
    `${side} ${halfSide}`,
    `${side} ${side}`,
    `${halfSide} ${side}`,
    `0 ${side}`,
    `0 ${halfSide}`,
    `0 0`,
    `${halfSide} 0`,
    `${side} 0`,
    `${side} ${halfSide}`,
  ]
  const percentageStep = 100 / 8

  let currentStep = 0
  let outString = ''

  for (let keyFramePercentage = 0; keyFramePercentage <= 100; keyFramePercentage += percentageStep) {
    currentStep += 1

    const clipPathPointsArray = new Array(10).fill('').map((_, i) => {
      return i > currentStep ? clipPathPoints[currentStep] : clipPathPoints[i]
    })

    outString += `${keyFramePercentage}% { clip-path: polygon(${clipPathPointsArray.join(',')}) }`
  }
  return outString
}

const SpinnerWrapper = styled.div`
  display: none;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

const SpinnerBody = styled.div`
  background: radial-gradient(circle, transparent 65%, #dcdbdb 65%);
  width: ${side};
  height: ${side};
  border-radius: 100%;
  animation: radar 1.5s linear alternate infinite, rotate 0.7s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes radar {
    ${createRadarKeyframes()}
  }
`

function Spinner(props, ref) {
  return (
    <SpinnerWrapper ref={ref}>
      <SpinnerBody />
    </SpinnerWrapper>
  )
}

export default React.forwardRef(Spinner)
