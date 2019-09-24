import React, { useState, useEffect, useReducer, useRef } from 'react'

import styled, { createGlobalStyle } from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import useMidiInputs from './useMidiInputs'

import { map } from './../HausdorffDimensions/fractals/lib'
import mixBlendModes from './../ShiftingSuns/constants/mixBlendModes'
import Logo from './Logo'
import fractals from './../HausdorffDimensions/fractals'


const colors = [
  'black',
'silver',	
'gray',	
'white',	
'maroon',	
'red',	
'purple',	
'fuchsia',	
'green',	
'lime',	
'olive',	
'yellow',	
'navy',	
'blue',	
'teal',	
'aqua',	
'antiquewhite',	
'aquamarine',	
'azure',	
'beige',	
'bisque',	
'blanchedalmond',	
'blueviolet',	
'brown',	
'burlywood',	
'cadetblue',	
'chartreuse',	
'chocolate',	
'coral',	
'cornflowerblue',	
'cornsilk',	
'crimson',	
'cyan',
'darkblue',	
'darkcyan',	
'darkgoldenrod',	
'darkgray',	
'darkgreen',	
'darkgrey',	
'darkkhaki',	
'darkmagenta',	
'darkolivegreen',	
'darkorange',	
'darkorchid',	
'darkred',	
'darksalmon',	
'darkseagreen',	
'darkslateblue',	
'darkslategray',	
'darkslategrey',	
'darkturquoise',	
'darkviolet',	
'deeppink',	
'deepskyblue',	
'dimgray',	
'dimgrey',	
'dodgerblue',	
'firebrick',	
'floralwhite',	
'forestgreen',	
'gainsboro',	
'ghostwhite',	
'gold',	
'goldenrod',	
'greenyellow',	
'grey',	
'honeydew',	
'hotpink',	
'indianred',	
'indigo',	
'ivory',	
'khaki',	
'lavender',	
'lavenderblush',	
'lawngreen',	
'lemonchiffon',	
'lightblue',	
'lightcoral',	
'lightcyan',	
'lightgoldenrodyellow',	
'lightgray',	
'lightgreen',	
'lightgrey',	
'lightpink',	
'lightsalmon',	
'lightseagreen',	
'lightskyblue',	
'lightslategray',	
'lightslategrey',	
'lightsteelblue',	
'lightyellow',	
'limegreen',	
'linen',	
'magenta',
]

const Screen = styled.div`
  position: absolute;
  left 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: fit-content;
  overflow: hidden;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

const Canvas = styled.canvas`
  display: block;
  max-width: inherit;
  max-height: inherit;
  opacity: .5;
`

const CanvasWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-self: center;
  justify-self: center;
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);

  filter: hue-rotate(-235deg) blur(1px) contrast(3.5) saturate(11) invert(1);
    opacity: 0.1;
`

const range = [0 , 127]

const LogoWrapper = styled.div`
position: absolute;
z-index: 1;
height: 50px;
left: 50px;
width: 50px;
top: 50px;
transition: all 1s ease;
`


const sliderIds = [7, 1, 71, 74]

const amplifierIds = [10, 91, 12, 93, 5, 71, 84, 72]

const padIds = [
  [49, 57, 51, 53,
  56, 39, 42, 46,
  50, 48, 45], [41],
  [36, 38], [40, 37],
]

function canvasSetup(context, width) {
  context.fillStyle = 'rgba(0,0,0,0.5)'
  context.globalCompositeOperation = 'xor'
  context.strokeStyle = 'rgba(0,0,0,0.5)'
}

async function draw(canvasRef, width, depth, fractalName) {
  const canvas = canvasRef.current
  if (canvas.getContext) {
    const context = canvas.getContext('2d')
    const fractalDefinition = fractals[fractalName]

    if (!fractalDefinition) {
      context.clearRect(0, 0, width, width)
      return
    }
    canvasSetup(context, width)
    await fractalDefinition.draw(context, width, Number(depth))
  }
}

export default function Simulacrum() {
  const [resizeRef, width] = useResizeObserver()

  const canvasRef = useRef()
  const midiInputs = useMidiInputs()

  const invert = midiInputs[amplifierIds[0]]

  const iframeBlendMode = midiInputs[amplifierIds[1]]
  const canvasBlendMode = midiInputs[amplifierIds[2]]

  const brightness = map(midiInputs[amplifierIds[3]], range, [-25, 25])
  const contrast = map(midiInputs[amplifierIds[4]], range, [-25, 25])

  const screenHueRotate = midiInputs[amplifierIds[5]]
  const canvasBackground = midiInputs[amplifierIds[6]]

  const overlayOpacity = map(midiInputs[amplifierIds[7]],range, [0, 1])

  
  let x = map(midiInputs[sliderIds[0]],range, [0, 126])
  let y = map(midiInputs[sliderIds[1]],range, [0, 126])
  let z = map(midiInputs[sliderIds[2]],range, [0, 126])
  let o = map(midiInputs[sliderIds[3]],range, [0, 1])



  useEffect(() => {
    padIds[0].forEach((mdi, i) => {
      if (midiInputs[mdi]) {
        draw(canvasRef, width, Math.floor(map(midiInputs[mdi], [0, 127], [1, 4])), Object.keys(fractals)[i])
      }
    })
  }, [width, midiInputs])



  const iframeMainZ = midiInputs[padIds[1][0]]

  const iframeOverInvert = map(midiInputs[padIds[3][0]], range, [0, 1])
  const iframeOverBlur = map(midiInputs[padIds[3][1]], range, [1, 100])


  return (
    <Screen style={{ backgroundColor: 'black', filter: `hue-rotate(${map(screenHueRotate, range, [-360, 360])}deg) invert(${map(invert, range, [-1, 1])})` }}>
        <LogoWrapper 
          style={{ transform: `rotateZ(${map(midiInputs[padIds[2][0]], range, [0, 4000])}deg) scale(${map(midiInputs[padIds[2][1]], range, [0, 90])})`, zIndex: iframeMainZ, position: 'absolute', zIndex: 1 }}>
          <Logo />
        </LogoWrapper>
      <CanvasWrapper ref={resizeRef}>
        <Canvas ref={canvasRef} height={width} width={width} style={{ mixBlendMode: mixBlendModes[Math.floor(map(canvasBlendMode, range, [0, 15]))], backgroundColor: `${colors[canvasBackground]}`, filter: `blur(${x}px) saturate(${y}) brightness(${z}) opacity(${o})` }}/>

        <iframe width="100%"
        height="100%"
        src="//www.youtube.com/embed/6G_IU5lK1E8"
        allowFullScreen
        autoPlay
        style={{ zIndex: iframeMainZ, position: 'absolute', filter: `brightness(${brightness}) contrast(${contrast})`, mixBlendMode: mixBlendModes[Math.floor(map(iframeBlendMode, range, [0, 15]))] }} />
        
        <iframe width="100%"
        height="100%"
        src="//www.youtube.com/embed/JQ1dxTyUeWg"
        allowFullScreen
        autoPlay
        style={{ position: 'absolute', opacity: overlayOpacity, filter: `invert(${iframeOverInvert}) brightness(${iframeOverBlur})` }} />
      
      </CanvasWrapper>
    </Screen>
  )
}

/* 

  memories 6G_IU5lK1E8 9m | bernband JQ1dxTyUeWg 4m

  daggers J9Gi0iTI2Mw 19m | thumper 3njfX2opKsM 5m

  sayonara irpqa9tKi48 16m | witness HbCXQq58eBk 13m

  celeste 6Kind3nR2o8 11m ? | antichamber g-lYxcOPIkw 24m

  frost fefiNTbU_-o 10m | sacramento uRH6X16qD6A 4m

  sky btE8Ak1_GBQ 20m | matrix 3zShaq61usw ∞m

*/

//Simulacrum & ?