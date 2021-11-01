import React, { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'
import * as THREE from 'three'

import { lerp, map, getRandomInteger } from '../../../math/utils'
import { steps } from '../attractorDefinitions'

extend({ MeshLine, MeshLineMaterial })

const colors = [
  new THREE.Color('rgb(98%, 39%, 36%)'), // red
  new THREE.Color('rgb(80%, 59%, 99%)'), // violet
  new THREE.Color('rgb(92%, 28%, 54%)'), // pink
  new THREE.Color('rgb(0%, 77%, 60%)'), // teal
  new THREE.Color('rgb(100%, 76%, 31%)'), // orange
  new THREE.Color('rgb(20%, 60%, 100%)'), // blue
  new THREE.Color('rgb(100%, 92%, 89%)'), // white
]

let drawCount = 0
const drawSpeed = 5

export function Attractor({ points, scale }) {
  const tipRef = useRef()
  const lineRef = useRef()

  const scaleVector = new THREE.Vector3(scale, scale, scale)

  useFrame(({ clock }) => {
    const line = lineRef.current
    const tip = tipRef.current

    const updatedPoints = points.slice(0, drawCount)
    line.geometry.points = updatedPoints

    const tipLength = Math.floor(map(drawCount, [0, steps], [5, steps * 0.01]))
    tip.geometry.points = updatedPoints.slice(-tipLength)

    drawCount = (drawCount + drawSpeed) % steps

    line.material.opacity = lerp(Math.random(), 0.1, 1)
    if (clock.elapsedTime % Math.random() < 0.01) {
      line.material.color = colors[getRandomInteger(0, colors.length - 1)]
      tip.material.color = colors[getRandomInteger(0, colors.length - 1)]
      tip.material.lineWidth = lerp(Math.random(), 0.1, 1)
    }
  }, [])

  return (
    <>
      <mesh ref={tipRef} scale={scaleVector} raycast={MeshLineRaycast}>
        <meshLine attach="geometry" points={points} />
        <meshLineMaterial attach="material" lineWidth={1} color={colors[0]} />
      </mesh>

      <mesh ref={lineRef} scale={scaleVector} raycast={MeshLineRaycast}>
        <meshLine attach="geometry" points={points} />
        <meshLineMaterial attach="material" lineWidth={0.1} color={colors[0]} />
      </mesh>
    </>
  )
}
