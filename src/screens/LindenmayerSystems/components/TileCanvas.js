import React, { useLayoutEffect, useRef } from 'react'
import { tileDrawMap } from '../control/tileDrawMap'

function drawToCardsCanvas(ref, graphicSettingsStatePropertyName, optionName) {
  const canvas = ref.current
  if (canvas.getContext) {
    tileDrawMap[graphicSettingsStatePropertyName](ref, optionName)
  }
}

export const TileCanvas = ({ graphicSettingsStatePropertyName, optionName }) => {
  const ref = useRef()

  useLayoutEffect(() => {
    drawToCardsCanvas(ref, graphicSettingsStatePropertyName, optionName)
  }, [ref, optionName, graphicSettingsStatePropertyName])

  return <canvas ref={ref} width={55} height={55} />
}
