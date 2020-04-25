import React from 'react'
import styled from 'styled-components'
import { plotDefinitions } from '../plotDefinitions'
import { SET_MAP } from '../reducer'
import { GenericContainer } from './GenericContainer'

const Button = styled.div`
  cursor: pointer;
  width: fit-content;
  box-sizing: border-box;
  height: 22px;
  ${({ selected }) => (selected ? 'border-bottom: solid 0.75px;' : '')};
`

export function MapSwitcher({ state, dispatch }) {
  return (
    <GenericContainer>
      {Object.keys(plotDefinitions).map(mapName => (
        <Button
          selected={state.mapName === mapName}
          key={mapName}
          onClick={() => dispatch({ type: SET_MAP, payload: mapName })}
        >
          {mapName}
        </Button>
      ))}
    </GenericContainer>
  )
}
