import React from 'react'
import styled from 'styled-components'

import Slider from '../../../globalComponents/Slider'
import { SET_CLEAR_BEFORE_DRAW, SET_CLEAR_REMAINING_ANIMATIONS, SET_DRAW_FULL } from '../state/actions'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  align-self: center;
`

export const TopController = ({ state, dispatchGeneration, dispatch, isDarkMode, setIsDarkMode }) => {
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
        <input
          type="checkbox"
          checked={state.clearBeforeDraw}
          onChange={e => {
            dispatch({ type: SET_CLEAR_BEFORE_DRAW, payload: e.target.checked })
          }}
        />
        <input
          type="checkbox"
          checked={state.clearRemainingAnimations}
          onChange={e => {
            dispatch({ type: SET_CLEAR_REMAINING_ANIMATIONS, payload: e.target.checked })
          }}
        />
        <input
          type="checkbox"
          checked={state.drawFull}
          onChange={e => {
            dispatch({ type: SET_DRAW_FULL, payload: e.target.checked })
          }}
        />
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={e => {
            setIsDarkMode(e.target.checked)
          }}
        />
      </div>
    </Wrapper>
  )
}
