import React from 'react'
import styled from 'styled-components'

import { SET_PARAMETER } from '../reducer'
import { GenericContainer } from './GenericContainer'

const ValueHolder = styled.div`
  font-size: 12px;
  width: 37px;
`

export function ParameterKnobs({ state, dispatch }) {
  return state.parameters ? (
    <GenericContainer>
      {Object.entries(state.parameters).map(([parameterName, value]) => {
        const [min, max] = state.parametersRange[parameterName]
        const step = state.parametersStep

        const onChange = event => {
          dispatch({ type: SET_PARAMETER, payload: { [parameterName]: event.target.value } })
        }

        return (
          <React.Fragment key={state.mapName + parameterName}>
            <input type="range" step={step} min={min} max={max} value={value} onChange={onChange} />
            <ValueHolder>{value}</ValueHolder>
          </React.Fragment>
        )
      })}
    </GenericContainer>
  ) : null
}
