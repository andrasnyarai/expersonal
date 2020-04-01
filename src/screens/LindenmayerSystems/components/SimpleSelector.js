import React from 'react'
import styled from 'styled-components'
import { Tile } from './Tile'

const Rail = styled.div`
  height: 50px;
  max-width: 80vw;
  margin: 0 5px 4px 5px;
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
`
const Scroller = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: ${({ n }) => `repeat(${n}, 55px)`};
`

const Button = styled.div`
  display: flex;
  box-sizing: border-box;
  border: #ccc solid 1px;
  border-radius: 5px;
  box-shadow: 0 0.5px 0.5px rgba(0, 0, 0, 0.15);
  position: relative;

  width: 55px;
  overflow: hidden;
  cursor: pointer;

  justify-content: center;

  &:active {
    box-shadow: inset -0.5px 0.5px 1px 0px rgba(0, 0, 0, 0.15);
  }

  ${({ isCurrent }) => (isCurrent ? 'background-color: #dcdcdc;' : '')}
`

const Title = styled.div`
  word-break: break-all;
  position: absolute;
  background-color: white;
  opacity: 0.7;
  height: 100%;
  width: 100%;
`

export const SimpleSelector = ({ className, options, current, onSelect, graphicSettingsStatePropertyName }) => {
  return (
    <Rail className={className}>
      <Scroller n={options.length}>
        {options.map(optionName => (
          <Button key={optionName} isCurrent={current === optionName} onClick={() => onSelect(optionName)}>
            {current === optionName && <Title>{optionName}</Title>}
            <Tile optionName={optionName} graphicSettingsStatePropertyName={graphicSettingsStatePropertyName} />
          </Button>
        ))}
      </Scroller>
    </Rail>
  )
}
