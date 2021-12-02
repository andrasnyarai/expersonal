import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { createGlobalStyle } from 'styled-components'

import { attractorDefinitions } from './attractorDefinitions'
import { Effects } from './components/Effects'
import { CameraControls } from './components/CameraControls'
import { Attractor } from './components/Attractor'
import { ControlPanel } from './components/ControlPanel'

const isServer = typeof window === 'undefined'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    margin: 0;
    height: 100%;
    overflow: hidden;
    background-color: black;
    user-select: none;
    /* disable left swipe history go back on desktop */
    overscroll-behavior-x: none;
  }
`

const defaultAttractorName = 'lorenz'
const defaultAttractor = attractorDefinitions[defaultAttractorName]

export const multipleCount = 15

export const drawOptions = {
  trajectory: 'trajectory',
  multiple: 'multiple',
  particles: 'particles',
}

export const particleVariablesDefinition = {
  phase: { startingValue: 4, range: [2.5, 10], step: 0.1 },
  spin: { startingValue: 2, range: [0, 20], step: 0.1 },
  stability: { startingValue: 1, range: [1, 4], step: 1 },
}

export default function StrangeAttractors() {
  const [drawOption, setDrawOption] = useState(drawOptions.trajectory)
  const [particleVariables, setParticleVariables] = useState({
    ...Object.entries(particleVariablesDefinition).reduce(
      (acc, [variableName, { startingValue }]) => ({ ...acc, [variableName]: startingValue }),
      {},
    ),
  })

  const [attractors, setAttractor] = useState(
    new Array(drawOption === drawOptions.trajectory ? 1 : multipleCount).fill('').map(() => ({
      scale: defaultAttractor.scale,
      points: defaultAttractor.createPoints(),
      name: defaultAttractorName,
    })),
  )

  return (
    <>
      <GlobalStyle />
      <ControlPanel
        setAttractor={setAttractor}
        activeAttractorName={attractors[0].name}
        drawOption={drawOption}
        setDrawOption={setDrawOption}
        particleVariables={particleVariables}
        setParticleVariables={setParticleVariables}
      />

      <Canvas
        style={{ height: '100vh' }}
        camera={{ position: [0, 0, 55] }}
        pixelRatio={isServer ? 1 : window.devicePixelRatio}
        gl={{ antialias: false }}
      >
        <CameraControls />
        {attractors.map(({ points, scale }, i) => (
          <Attractor
            key={i}
            i={i}
            points={points}
            scale={scale}
            drawOption={drawOption}
            particleVariables={particleVariables}
          />
        ))}
        <Effects />
      </Canvas>
    </>
  )
}
