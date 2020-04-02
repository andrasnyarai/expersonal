import React, { useState } from 'react'
import styled from 'styled-components'

import { TileTitle } from './TileTitle'
import { TileCanvas } from './TileCanvas'

const TileBody = styled.div`
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

  ${({ isSelected }) => (isSelected ? 'background-color: #dcdcdc;' : '')}
`

export const Tile = ({ optionName, graphicSettingsStatePropertyName, onClick, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <TileBody
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isSelected={isSelected}
      onClick={onClick}
    >
      <TileTitle isVisible={isHovered || isSelected}>{optionName}</TileTitle>
      <TileCanvas optionName={optionName} graphicSettingsStatePropertyName={graphicSettingsStatePropertyName} />
    </TileBody>
  )
}
