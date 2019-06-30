import React from 'react'
import styled from 'styled-components'

import fractals from '../../fractals'

import OptionsContainer from './OptionsContainer'
import Card from './Card'
import { MEDIUM, LARGE } from '../../constants/mediaQueries'
import { CARD_SIZE } from './constants'
import { SLIDER_HEIGHT } from './../Slider/constants'

const fractalNames = Object.keys(fractals)
const gradientString = '#eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%'

const SelectorBody = styled.div`
  --gap: 20px;
  --cardSize: ${CARD_SIZE}px;
  position: relative;
  overflow: hidden;
  height: calc(var(--cardSize) + (var(--gap) * 2) + 2px);
  margin: var(--gap);
  @media (min-width: ${MEDIUM}px) {
    width: fit-content;
    justify-self: flex-end;
    min-height: 550px;
    height: calc(100vh - ${SLIDER_HEIGHT + 70}px);
  }
  @media (min-width: ${LARGE}px) {
    height: fit-content;
    justify-self: center;
    align-self: center;
  }
`

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  mix-blend-mode: screen;
  pointer-events: none;
  background: linear-gradient(to left, ${gradientString});
  @media (min-width: ${MEDIUM}px) {
    background: linear-gradient(to bottom, ${gradientString});
  }
`

export default function Selector({ className, current, dispatch }) {
  return (
    <SelectorBody className={className}>
      <OptionsContainer cardsLength={fractalNames.length}>
        {fractalNames.map(name => (
          <Card key={name} name={name} dispatch={dispatch} current={current} />
        ))}
      </OptionsContainer>
      <BackgroundOverlay />
    </SelectorBody>
  )
}
