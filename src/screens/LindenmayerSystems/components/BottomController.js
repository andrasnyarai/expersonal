import React, { useState } from 'react'
import styled from 'styled-components'

import {
  SET_CURVE,
  SET_GRADIENT_NAME,
  SET_LINE_WIDTH_STYLE,
  SET_COMPOSITE_OPERATION,
  SET_LINE_CAPS,
} from '../state/actions'
import curves from '../control/spaceFillingCurves'
import { gradientNames, compositeOperations, lineCaps, lineWidthStyleMap } from '../control/constants'
import { SimpleSelector } from './SimpleSelector'
import { TileTitle } from './TileTitle'

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isStacked }) =>
    isStacked
      ? `
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        `
      : ''};
`

const GraphicsPanel = styled.div`
  transform: translateY(-12vh);
  @media screen and (max-height: 450px) and (orientation: landscape) {
    transform: translateY(-1vh);
  }
`

const SelectorActivator = styled.div`
  box-sizing: border-box;
  background-color: #f5f5f5;
  border: #c5c5c5 solid 0.5px;
  border-radius: 10px;
  width: 55px;
  height: 55px;
  margin: 1px;
  display: inline-block;
  overflow: hidden;
  position: relative;
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

  return (
    <ControlPanel isStacked={shouldRenderStackedControls}>
      {shouldRenderStackedControls && (
        <GraphicsPanel>
          {actionNames.map(actionName => {
            const isCurrent = actionName === activeGraphicsSettings.actionName
            return (
              <SelectorActivator
                key={actionName}
                isCurrent={isCurrent}
                onClick={() => {
                  setActiveGraphicsSettings({
                    actionName,
                    ...getGraphicsSettings(actionName),
                  })
                }}
              >
                <TileTitle isVisible={!isCurrent}>{state[getGraphicsSettingsStatePropertyName(actionName)]}</TileTitle>
              </SelectorActivator>
            )
          })}
        </GraphicsPanel>
      )}
      {actionNames.map(actionName => {
        const graphicSettingsStatePropertyName = getGraphicsSettingsStatePropertyName(actionName)
        const isVisisble = shouldRenderStackedControls ? activeGraphicsSettings.actionName === actionName : true
        return (
          <SimpleSelector
            isFloating={shouldRenderStackedControls}
            key={actionName}
            isVisible={isVisisble}
            graphicSettingsStatePropertyName={graphicSettingsStatePropertyName}
            current={state[graphicSettingsStatePropertyName]}
            options={getGraphicsSettingsOptions(actionName)}
            onSelect={optionName => dispatch({ type: actionName, payload: optionName })}
          />
        )
      })}
    </ControlPanel>
  )
}
