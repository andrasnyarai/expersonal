import React, { useRef } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import styled, { createGlobalStyle } from 'styled-components'

import { links } from './links'
import { cubeGap, cubeZRows } from './constants'
import { Bloom } from './components/Bloom'
import { Cubes } from './components/Cubes'
import { Anchor } from './components/Anchor'
import { Logo } from './components/Logo'

const isServer = typeof window === 'undefined'

useLoader.preload(THREE.FontLoader, '/Relative_Book.json')

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    margin: 0;
    background-color: black;
  }
`

const Scroller = styled.div`
  top: 0px;
  height: 103vh;
  overscroll-behavior: none;
  width: 100%;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px;
  }
`

const cameraAdjustedZRows = cubeZRows - 1
const scrollerHeight = 15000
const scrollerYBottom = 1000
const scrollerYSlow = 0.07
const scrollerZSlow = 0.005

function Camera({ scrollerRef }) {
  useFrame(({ camera }) => {
    const y = scrollerRef.current ? scrollerRef.current.scrollTop : 0

    if (y >= scrollerYBottom) {
      camera.position.y = -(scrollerYBottom * scrollerYSlow)
      camera.position.z = cameraAdjustedZRows * cubeGap - (y - scrollerYBottom) * scrollerZSlow
    } else {
      camera.position.y = -y * scrollerYSlow
      camera.position.z = cameraAdjustedZRows * cubeGap
    }
  })

  return null
}

export default function Dashboard() {
  const scrollerRef = useRef()

  //
  // react-three-fiber -> @react-three/fiber
  // upgrading breaks effectcomposer with suspense components
  // and messes up sMAAPass
  //
  // scrolling reminder
  // iframe gallery
  // 2d canvas plane links
  // social links
  //
  // strange attractors
  // steinmetz solids
  //
  // get final domain
  // expersonal finish
  //

  return (
    <>
      <GlobalStyle />
      <Scroller ref={scrollerRef}>
        <Canvas
          pixelRatio={isServer ? 1 : window.devicePixelRatio}
          gl={{ antialias: true }}
          style={{ height: '100vh', position: 'sticky', top: 0 }}
          camera={{ position: [0, 5, cameraAdjustedZRows * cubeGap], fov: 100 }}
        >
          <Camera scrollerRef={scrollerRef} />
          <Logo />
          <Cubes />
          <Bloom />
          <fog attach="fog" args={['black', 30, 40]} />

          {links.map((link, i) => {
            const offset = i * 2 + 1
            return (
              <Anchor
                key={link.title}
                {...link}
                position={[0, -(scrollerYBottom * scrollerYSlow), (cameraAdjustedZRows - offset) * cubeGap]}
              />
            )
          })}
        </Canvas>
        <div style={{ height: scrollerHeight }} />
      </Scroller>
    </>
  )
}
