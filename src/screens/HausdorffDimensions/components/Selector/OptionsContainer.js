import styled from 'styled-components'

import { MEDIUM, LARGE } from '../../constants/mediaQueries'
import { CARD_SIZE } from './constants'

const OptionsContainer = styled.div`
  background-color: white;
  box-sizing: border-box;
  border: 1px solid lightgray;
  padding: var(--gap);
  display: grid;
  grid-template-columns: ${({ cardsLength }) => `repeat(${cardsLength}, 1fr)`};
  grid-template-rows: ${CARD_SIZE}px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-padding: 0 50%;
  grid-gap: var(--gap);
  scroll-snap-type: x mandatory;
  & div:last-child::after {
    content: '';
    display: block;
    position: absolute;
    right: calc(-1 * var(--gap));
    width: var(--gap);
    height: 1px;
  }

  @media (min-width: ${MEDIUM}px) {
    grid-template-rows: ${({ cardsLength }) => `repeat(${cardsLength}, 1fr)`};
    grid-template-columns: ${CARD_SIZE}px;
    width: calc(${CARD_SIZE} + var(--gap) * 2);
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    overflow-x: hidden;
    height: 100%;

    & div:last-child::after {
      bottom: calc(-1 * var(--gap));
      height: var(--gap);
      width: 1px;
    }
  }
  @media (min-width: ${LARGE}px) {
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(2, 1fr);
    width: calc(${2 * CARD_SIZE} + var(--gap) * 3);
  }
`

export default OptionsContainer
