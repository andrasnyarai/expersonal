import React, { useRef, useState, useMemo, Suspense } from 'react'
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { a, useSpring } from '@react-spring/three'

import { hollowCubeGeometry } from '../hollowCubeGeometry'

function AnchorText({ text, size = 1, position }) {
  const font = useLoader(THREE.FontLoader, '/Relative_Book.json')
  const config = useMemo(
    () => ({
      font,
      size: 1,
      height: 0.5,
      curveSegments: 32,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 4,
    }),
    [font],
  )

  return (
    <mesh position={position} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <textBufferGeometry args={[text, config]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export function Anchor({ position, title, link, backgroundColor, imageUrl }) {
  const ref = useRef()
  const texture = useLoader(THREE.TextureLoader, imageUrl)

  const [hovered, setHover] = useState(0)

  const { spring } = useSpring({
    spring: hovered,
  })

  const color = spring.to([0, 1], [backgroundColor, '#237051'])

  return (
    <group position={position}>
      <mesh
        ref={ref}
        position={[0, 0, -0.5]}
        onClick={event => {
          event.stopPropagation()
          window.open(link, '_blank')
        }}
        onPointerOver={event => {
          event.stopPropagation()
          setHover(1)
        }}
        onPointerOut={event => {
          event.stopPropagation()
          setHover(0)
        }}
      >
        <planeBufferGeometry args={[1, 1, 1, 1]} />
        <a.meshBasicMaterial transparent opacity={0.9} color={color} map={texture} />
      </mesh>

      <Suspense fallback={null}>
        <AnchorText size={0.7} position={[-0.35, 0.35, 0.5]} text={title} />
      </Suspense>

      <mesh args={[hollowCubeGeometry, null]}>
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}
