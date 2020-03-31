import React from 'react'
import styled from 'styled-components'

import Slider from '../../../globalComponents/Slider'
import { SET_CLEAR_BEFORE_DRAW, SET_CLEAR_REMAINING_ANIMATIONS, SET_DRAW_FULL, SET_DARK_MODE } from '../state/actions'

const actionNameToStatePropertyName = {
  [SET_CLEAR_BEFORE_DRAW]: 'clearBeforeDraw',
  [SET_CLEAR_REMAINING_ANIMATIONS]: 'clearRemainingAnimations',
  [SET_DRAW_FULL]: 'drawFull',
  [SET_DARK_MODE]: 'darkMode',
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  max-width: 850px;
  margin: 0 10vw 0 10vw;
  align-self: center;
`

const CheckboxWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(50px, 150px) minmax(50px, 150px);
  grid-gap: 2.5px;
`

export const TopController = ({ state, dispatchGeneration, dispatch }) => {
  return (
    <Wrapper>
      <Slider
        compact
        defaultXPercent={33}
        current={state.generation}
        cb={dispatchGeneration}
        maxRange={state.curve.maxGeneration}
        entityName={state.curveName}
      />
      <CheckboxWrapper>
        {Object.entries(actionNameToStatePropertyName).map(([actionName, statePropertyName]) => (
          <div key={actionName} style={{ overflow: 'hidden' }}>
            <input
              type="checkbox"
              checked={state[statePropertyName]}
              onChange={e => {
                dispatch({ type: actionName, payload: e.target.checked })
              }}
            />
            <div>{actionName}</div>
          </div>
        ))}
      </CheckboxWrapper>
    </Wrapper>
  )
}
