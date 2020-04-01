import React, { useLayoutEffect, useRef } from 'react'
import { tileDrawMap } from '../control/tileDrawMap'

function drawToCardsCanvas(ref, graphicSettingsStatePropertyName, optionName) {
  const canvas = ref.current
  if (canvas.getContext) {
    tileDrawMap[graphicSettingsStatePropertyName](ref, optionName)
  }
}

export const Tile = ({ graphicSettingsStatePropertyName, optionName }) => {
  const ref = useRef()

  useLayoutEffect(() => {
    drawToCardsCanvas(ref, graphicSettingsStatePropertyName, optionName)
  }, [ref, optionName, graphicSettingsStatePropertyName])

  return <canvas ref={ref} id={name} width={50} height={50} />
}
