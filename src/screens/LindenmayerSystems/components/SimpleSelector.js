import React from 'react'
import styled from 'styled-components'
import { Tile } from './Tile'

const Rail = styled.div`
  height: 50px;
  max-width: 80vw;
  ${({ isFloating }) => (isFloating ? '' : 'margin: 0 5px 4px 5px;')};
  align-self: center;
  overflow-x: scroll;

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
