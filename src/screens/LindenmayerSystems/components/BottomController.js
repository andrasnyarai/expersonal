import React, { useState } from 'react'
import styled from 'styled-components'

import {
  SET_CURVE,
  SET_GRADIENT_NAME,
  SET_LINE_WIDTH_STYLE,
  SET_COMPOSITE_OPERATION,
  SET_LINE_CAPS,
} from '../state/actions'
import { SimpleSelector } from './SimpleSelector'
import curves from '../control/spaceFillingCurves'
import { gradientNames, compositeOperations, lineCaps, lineWidthStyleMap } from '../control/constants'

const FullControlPanel = styled.div`
  display: flex;
  flex-direction: column;
`

const StackedControlPanel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GraphicsPanel = styled.div``

const SelectorActivator = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0.5px 0.5px rgba(0, 0, 0, 0.15);
  display: inline-block;
  width: 55px;
  height: 55px;
  margin: 1px;

  overflow: hidden;

  &:active {
    box-shadow: inset -0.5px 0.5px 1px 0px rgba(0, 0, 0, 0.15);
  }

  ${({ isCurrent }) => (isCurrent ? 'background-color: #dcdcdc;' : '')}
`

const FloatingSimpleSelector = styled(SimpleSelector)`
  position: absolute;
  transform: translateY(-10vh);
  max-width: 75vw;
`

const graphicsSettings = {
  [SET_CURVE]: { statePropertyName: 'curveName', options: Object.keys(curves) },
  [SET_COMPOSITE_OPERATION]: { statePropertyName: 'compositeOperation', options: compositeOperations },
  [SET_GRADIENT_NAME]: { statePropertyName: 'gradientName', options: gradientNames },
  [SET_LINE_WIDTH_STYLE]: { statePropertyName: 'lineWidthStyle', options: Object.keys(lineWidthStyleMap) },
  [SET_LINE_CAPS]: { statePropertyName: 'lineCaps', options: lineCaps },
}

const actionNames = Object.keys(graphicsSettings)

function getGraphicsSettings(actionName) {
  return graphicsSettings[actionName]
}

function getGraphicsSettingsOptions(actionName) {
  return getGraphicsSettings(actionName).options
}

function getGraphicsSettingsStatePropertyName(actionName) {
  return getGraphicsSettings(actionName).statePropertyName
}

export const BottomController = ({ shouldRenderStackedControls, state, dispatch }) => {
  const [activeGraphicsSettings, setActiveGraphicsSettings] = useState({
    actionName: '',
    statePropertyName: '',
    options: [],
  })

  return shouldRenderStackedControls ? (
    <StackedControlPanel>
      <GraphicsPanel>
        {actionNames.map(actionName => (
          <SelectorActivator
            key={actionName}
            isCurrent={actionName === activeGraphicsSettings.actionName}
            onClick={() => {
              setActiveGraphicsSettings({
                actionName,
                ...getGraphicsSettings(actionName),
              })
            }}
          >
            {actionName}
          </SelectorActivator>
        ))}
      </GraphicsPanel>

      <FloatingSimpleSelector
        current={state[activeGraphicsSettings.statePropertyName]}
        options={activeGraphicsSettings.options}
        onSelect={optionName => dispatch({ type: activeGraphicsSettings.actionName, payload: optionName })}
      />
    </StackedControlPanel>
  ) : (
    <FullControlPanel>
      {actionNames.map(actionName => {
        return (
          <SimpleSelector
            current={state[getGraphicsSettingsStatePropertyName(actionName)]}
            key={actionName}
            options={getGraphicsSettingsOptions(actionName)}
            onSelect={optionName => dispatch({ type: actionName, payload: optionName })}
          />
        )
      })}
    </FullControlPanel>
  )
}
