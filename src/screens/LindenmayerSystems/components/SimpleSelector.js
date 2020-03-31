import React from 'react'
import styled from 'styled-components'

const Rail = styled.div`
  height: 50px;
  margin: 0 5px 5px 5px;
  overflow-x: scroll;
  align-self: center;
  max-width: 80vw;
`
const Scroller = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: ${({ n }) => `repeat(${n}, 55px)`};
`

const Button = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 0.5px 0.5px rgba(0, 0, 0, 0.15);
  width: 55px;
  overflow: hidden;
  cursor: pointer;

  &:active {
    box-shadow: inset -0.5px 0.5px 1px 0px rgba(0, 0, 0, 0.15);
  }

  ${({ isCurrent }) => (isCurrent ? 'background-color: #dcdcdc;' : '')}
`

export const SimpleSelector = ({ className, options, current, onSelect }) => (
  <Rail className={className}>
    <Scroller n={options.length}>
      {options.map(optionName => (
        <Button key={optionName} isCurrent={current === optionName} onClick={() => onSelect(optionName)}>
          {optionName}
        </Button>
      ))}
    </Scroller>
  </Rail>
)
