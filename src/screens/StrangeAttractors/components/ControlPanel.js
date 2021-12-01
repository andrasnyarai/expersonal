import React, { useState } from 'react'
import styled from 'styled-components'
import { drawOptions, multipleCount, particleVariablesDefinition } from '..'

import { attractorDefinitions } from '../attractorDefinitions'

const wrapperSize = 75
const diagonalWidth = Math.sqrt(wrapperSize ** 2 + wrapperSize ** 2)

const Wrapper = styled.div`
  color: white;
  position: absolute;
  width: ${wrapperSize}px;
  z-index: 1;
  right: 0;
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
  transform: scaleX(-1);

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
  right: 15px;
  position: absolute;
  direction: rtl;
  display: grid;
  grid-auto-rows: 25px;
  width: 100%;
  overflow: hidden;

  height: ${({ isOpen, arrayLength }) => (isOpen ? `${arrayLength * 25}px` : '0')};
  transition: ${({ isOpen, arrayLength }) => `height 0s linear ${isOpen ? '0s' : `${(arrayLength - 1) * 0.05}s`}`};
  ${({ isOpen }) => isOpen && `${Text} { transform: translateY(0%); }`}
`

const ItemWrapper = styled.div`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'white' : '#525252')};
  transition: color 0.1s linear;
  overflow-y: hidden;
`

const Separator = styled.div`
  position: absolute;
  background-color: #525252;
  height: 1px;
  margin-top: 2px;
`

const Input = styled.input`
  direction: ltr;
  width: 100%;
  margin: 0px;
  position: absolute;
  top: 3px;
  opacity: 0.5;

  background: transparent;
  cursor: ew-resize;

  -webkit-appearance: none;
  appearance: none;

  /* Thumb */
  ::-webkit-slider-thumb {
    border-radius: 0px;
    background: #ffffff;
    height: 17px;
    width: 5px;
    -webkit-appearance: none;
    appearance: none;
  }
  ::-moz-range-thumb {
    border-radius: 0px;
    background: #ffffff;
    height: 17px;
    width: 5px;
    -moz-appearance: none;
    appearance: none;
  }
  ::-ms-thumb {
    border-radius: 0px;
    background: #ffffff;
    height: 17px;
    width: 5px;
    -ms-appearance: none;
    appearance: none;
  }

  /* Track */
  ::-webkit-slider-runnable-track {
    background: transparent;
  }
  ::-moz-range-track {
    background: transparent;
  }
  ::-ms-track {
    background: transparent;
  }
`

// thumbs will stay there when animating away

export function ControlPanel({
  setAttractor,
  activeAttractorName,
  setDrawOption,
  drawOption,
  setParticleVariables,
  particleVariables,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const items = Object.entries(attractorDefinitions)
    .concat([['-', {}]])
    .concat(Object.entries(drawOptions))
    .concat(drawOption === drawOptions.particles ? [['-', {}]] : [])
    .concat(drawOption === drawOptions.particles ? Object.entries(particleVariables) : [])

  return (
    <Wrapper>
      <MenuButtonWrapper onClick={() => setIsOpen(!isOpen)}>
        <MenuButton />
      </MenuButtonWrapper>
      <ItemsWrapper isOpen={isOpen} arrayLength={items.length}>
        <Separator />
        <Separator />
        {items.map(([itemName, itemDescription], i, array) => {
          if (itemName === '-') {
            // empty line
            return (
              <ItemWrapper key={i} style={{ cursor: 'default' }}>
                <Text delay={i} isOpen={isOpen} arrayLength={array.length}>
                  {''}
                </Text>
              </ItemWrapper>
            )
          } else if (drawOptions[itemName]) {
            // drawOPtion setter
            const option = itemName
            return (
              <ItemWrapper
                key={option}
                isActive={option === drawOption}
                onClick={() => {
                  const { scale, createPoints } = attractorDefinitions[activeAttractorName]
                  setAttractor(
                    //  i have to factor this into a reducer
                    new Array(option === drawOptions.trajectory ? 1 : multipleCount).fill('').map(() => ({
                      scale: scale,
                      points: createPoints(),
                      name: activeAttractorName,
                    })),
                  )
                  setDrawOption(option)
                }}
              >
                <Text delay={i} isOpen={isOpen} arrayLength={array.length}>
                  {option}
                </Text>
              </ItemWrapper>
            )
          } else if (particleVariablesDefinition[itemName]) {
            // particle variable setter
            const name = itemName
            const value = itemDescription

            const onChange = e => {
              const newValue = e.target.value
              setParticleVariables(variables => ({ ...variables, [name]: Number(newValue) }))
            }

            const { range, step } = particleVariablesDefinition[name]
            const [min, max] = range

            return (
              <ItemWrapper key={name} style={{ position: 'relative' }}>
                <Text delay={i} isOpen={isOpen} arrayLength={array.length}>
                  {name}
                </Text>
                <Input type="range" step={step} min={min} max={max} value={value} onChange={onChange} />
              </ItemWrapper>
            )
          }
          // attractor setter
          const { scale, createPoints } = itemDescription
          return (
            <ItemWrapper
              key={itemName}
              isActive={activeAttractorName === itemName}
              onClick={() => {
                setAttractor(
                  //  i have to factor this into a reducer
                  new Array(drawOption === drawOptions.trajectory ? 1 : multipleCount).fill('').map(() => ({
                    scale: scale,
                    points: createPoints(),
                    name: itemName,
                  })),
                )
              }}
            >
              <Text delay={i} isOpen={isOpen} arrayLength={array.length}>
                {itemName}
              </Text>
            </ItemWrapper>
          )
        })}
      </ItemsWrapper>
    </Wrapper>
  )
}
