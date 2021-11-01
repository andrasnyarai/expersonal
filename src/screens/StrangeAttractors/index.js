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
  }
`

const { lorenz } = attractorDefinitions

export default function StrangeAttractors() {
  const [{ points, scale, name }, setAttractor] = useState({
    scale: lorenz.scale,
    points: lorenz.createPoints(),
    name: 'lorenz',
  })

  return (
    <>
      <GlobalStyle />
      <ControlPanel setAttractor={setAttractor} activeAttractorName={name} />

      <Canvas
        style={{ height: '100vh' }}
        camera={{ position: [0, 0, 55] }}
        pixelRatio={isServer ? 1 : window.devicePixelRatio}
        gl={{ antialias: false }}
      >
        <CameraControls />
        <Attractor points={points} scale={scale} />
        <Effects />
      </Canvas>
    </>
  )
}
