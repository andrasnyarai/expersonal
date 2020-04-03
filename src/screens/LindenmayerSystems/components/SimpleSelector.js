import React from 'react'
import styled from 'styled-components'
import { Tile } from './Tile'

const Rail = styled.div`
  height: 50px;
  max-width: 80vw;
  ${({ isFloating }) => (isFloating ? '' : 'margin: 0 5px 4px 5px;')};
  border-radius: 5px;
  align-self: center;
  overflow-x: scroll;

  /* horizontal scrolling shadow */
  background-image: linear-gradient(to right, white, white), linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));

  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 20px 100%, 20px 100%, 20px 100%, 20px 100%;
  background-attachment: local, local, scroll, scroll;

  ${({ isVisible }) => (isVisible ? 'opacity:1;z-index:1;' : 'opacity:0;z-index:0;')};
  ${({ isFloating }) => (isFloating ? 'position: absolute;transform: translateY(-21vh);max-width: 75vw;' : '')};

  @media screen and (max-height: 450px) and (orientation: landscape) {
    transform: translateY(-15vh);
  }
`
const Scroller = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: ${({ n }) => `repeat(${n}, 55px)`};
`

export const SimpleSelector = ({
  className,
  options,
  current,
  onSelect,
  graphicSettingsStatePropertyName,
  isVisible,
  isFloating,
}) => {
  return (
    <Rail isVisible={isVisible} isFloating={isFloating} className={className}>
      <Scroller n={options.length}>
        {options.map(optionName => (
          <Tile
            key={optionName}
            optionName={optionName}
            onClick={() => onSelect(optionName)}
            isSelected={current === optionName}
            graphicSettingsStatePropertyName={graphicSettingsStatePropertyName}
          />
        ))}
      </Scroller>
    </Rail>
  )
}
