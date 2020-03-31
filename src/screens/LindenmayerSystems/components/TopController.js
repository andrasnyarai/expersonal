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
  align-self: center;
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
      <div>
        {Object.entries(actionNameToStatePropertyName).map(([actionName, statePropertyName]) => (
          <input
            type="checkbox"
            key={actionName}
            checked={state[statePropertyName]}
            onChange={e => {
              dispatch({ type: actionName, payload: e.target.checked })
            }}
          />
        ))}
      </div>
    </Wrapper>
  )
}
