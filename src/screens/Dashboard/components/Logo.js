import React, { useRef, useMemo, Suspense } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'

import { cubeGap, cubeZRows } from '../constants'

function HeaderText({ text, size = 1 }) {
  const font = useLoader(THREE.FontLoader, '/Relative_Book.json')
  const ref = useRef()
  const config = useMemo(
    () => ({
      font,
      size: 20,
      height: 15,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font],
  )

  useFrame(({ clock }) => {
    if (clock.elapsedTime < 1.15) {
      ref.current.material.opacity = 0
      return
    }

    const light = -Math.abs(Math.tan((clock.elapsedTime - 10) * 0.2)) + 1
    const opacity = -light + 0.2
    ref.current.material.opacity = opacity

    if (opacity < 0.4 && opacity > 0.1) {
      if (clock.elapsedTime % Math.random() < 0.1) {
        ref.current.material.opacity = 0.8
      }
    }
  })

  return (
    <mesh scale={[0.1 * size, 0.1 * size, 0.1]} ref={ref}>
      <textBufferGeometry args={[text, config]} />
      <meshNormalMaterial transparent opacity={0} />
    </mesh>
  )
}

export function Logo() {
  const isSmallScreen = window.innerWidth < 450
  return (
    <group position={[isSmallScreen ? -15 : -25, 10, (cubeZRows - 8) * cubeGap]}>
      <Suspense fallback={null}>
        <HeaderText text="expersonal" size={isSmallScreen ? 1.5 : 2} />
      </Suspense>
    </group>
  )
}
