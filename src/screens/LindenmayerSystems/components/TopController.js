import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useTransition, useSpring, useChain, animated } from 'react-spring'

import Slider from '../../../globalComponents/Slider'
import { Expander } from './Expander'
import { SET_CLEAR_BEFORE_DRAW, SET_CLEAR_REMAINING_ANIMATIONS, SET_DRAW_FULL, SET_DARK_MODE } from '../state/actions'

const actionNameMap = {
  [SET_CLEAR_BEFORE_DRAW]: { statePropertyName: 'clearBeforeDraw', label: 'clear the canvas before draw' },
  [SET_CLEAR_REMAINING_ANIMATIONS]: {
    statePropertyName: 'clearRemainingAnimations',
    label: 'clear the unfinished shapes before draw',
  },
  [SET_DRAW_FULL]: { statePropertyName: 'drawFull', label: 'draw the full shape at once' },
  [SET_DARK_MODE]: { statePropertyName: 'darkMode', label: 'dark mode' },
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  max-width: 850px;
  margin: 0 10vw 0 10vw;
  align-self: center;
`

const ExpanderWrapper = styled.div`
  position: relative;
`

const OverflowContainer = styled(animated.div)`
  box-sizing: border-box;
  position: absolute;

  right: 0;
  z-index: 2;
  overflow: hidden;
  border-radius: 5px;

  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  grid-gap: 5px;
  padding-left: 5px;
  padding-right: 5px;
  background: white;
  border-radius: 5px;
  will-change: height, padding-top, padding-bottom, opacity;

  ${({ shouldRenderStackedControls }) => (shouldRenderStackedControls ? 'width: 80vw;' : 'width: 350px')};
`

const CheckboxContainer = styled(animated.div)`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 5px;
  will-change: transform, opacity;
  border: #c5c5c5 solid 0.5px;

  padding: 4px 1px 1px 4px;
  box-sizing: border-box;

  cursor: pointer;
  user-select: none;

  & input {
    margin: 0;
  }
`

export const TopController = ({ state, dispatchGeneration, dispatch, shouldRenderStackedControls }) => {
  const [open, setOpen] = useState(false)

  const springRef = useRef()
  const { height, paddingVertical, opacity, ...rest } = useSpring({
    ref: springRef,
    config: { tension: 700, friction: 50 },
    from: { height: '0%', paddingVertical: '5px', opacity: 0 },
    to: { height: open ? '165px' : '0%', paddingVertical: open ? '5px' : '0px', opacity: open ? 1 : 0 },
  })

  const transRef = useRef()
  const transitions = useTransition(open ? Object.entries(actionNameMap) : [], ([actionName]) => actionName, {
    ref: transRef,
    unique: true,
    config: { tension: 700, friction: 50 },
    from: { opacity: 0, transform: 'translateY(-55px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-55px)' },
  })

  useChain(open ? [springRef, transRef] : [transRef, springRef], [0.1])

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
      <ExpanderWrapper>
        <Expander open={open} setOpen={setOpen} />

        <OverflowContainer
          shouldRenderStackedControls={shouldRenderStackedControls}
          style={{ ...rest, height, paddingTop: paddingVertical, paddingBottom: paddingVertical, opacity }}
        >
          {transitions.map(({ item: [actionName, { statePropertyName, label }], key, props }) => (
            <CheckboxContainer key={key} style={{ ...props }}>
              <input
                type="checkbox"
                checked={state[statePropertyName]}
                onChange={e => {
                  dispatch({ type: actionName, payload: e.target.checked })
                }}
              />
              {` ${label}`}
            </CheckboxContainer>
          ))}
        </OverflowContainer>
      </ExpanderWrapper>
    </Wrapper>
  )
}
