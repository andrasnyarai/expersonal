import React, { useRef } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree()

  const controls = useRef()
  useFrame(() => controls.current.update())
  return (
    <orbitControls dampingFactor={0.1} enableDamping ref={controls} args={[camera, domElement]} target={[0, 0, 0]} />
  )
}
