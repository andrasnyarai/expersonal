import React, { useState } from 'react'
import styled from 'styled-components'

import { attractorDefinitions } from '../attractorDefinitions'

const wrapperSize = 75
const diagonalWidth = Math.sqrt(wrapperSize ** 2 + wrapperSize ** 2)

const Wrapper = styled.div`
  color: white;
  position: absolute;
  width: ${wrapperSize}px;
  z-index: 1;
`

const MenuButton = styled.div`
  position: absolute;
  background-color: #525252;
  width: ${diagonalWidth}px;
  height: 1px;

  transform: translateY(${wrapperSize}px) rotateZ(-45deg);
  transform-origin: top left;

  transition: background-color 0.1s linear;
`

const MenuButtonWrapper = styled.div`
  width: ${wrapperSize}px;
  height: ${wrapperSize}px;
  position: relative;
  clip-path: inset(15px);

  cursor: pointer;
  &:hover ${MenuButton} {
    background-color: white;
  }
`

const Text = styled.div`
  width: 100%;
  transition: ${({ delay, arrayLength, isOpen }) =>
    `transform 0.1s ease-in-out ${(isOpen ? delay : arrayLength - delay) * 0.025}s`};

  transform: translateY(-100%);
`

const ItemsWrapper = styled.div`
  padding-left: 15px;
  display: grid;
  width: 100%;
  overflow: hidden;

  height: ${({ isOpen }) => (isOpen ? '175px' : '0')};
  transition: ${({ isOpen, arrayLength }) => `height 0s linear ${isOpen ? '0s' : `${(arrayLength - 1) * 0.05}s`}`};
  ${({ isOpen }) => isOpen && `${Text} { transform: translateY(0%); }`}
`

const ItemWrapper = styled.div`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'white' : '#525252')};
  transition: color 0.1s linear;
  height: 100%;
  overflow-y: hidden;
`

export function ControlPanel({ setAttractor, activeAttractorName }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Wrapper>
      <MenuButtonWrapper onClick={() => setIsOpen(!isOpen)}>
        <MenuButton />
      </MenuButtonWrapper>
      <ItemsWrapper isOpen={isOpen} arrayLength={Object.keys(attractorDefinitions).length}>
        {Object.entries(attractorDefinitions).map(([attractorName, { scale, createPoints }], i, array) => {
          return (
            <ItemWrapper
              key={attractorName}
              isActive={activeAttractorName === attractorName}
              onClick={() => {
                setAttractor({ scale, points: createPoints(), name: attractorName })
              }}
            >
              <Text delay={i} isOpen={isOpen} arrayLength={array.length}>
                {attractorName}
              </Text>
            </ItemWrapper>
          )
        })}
      </ItemsWrapper>
    </Wrapper>
  )
}
