import React, { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'
import * as THREE from 'three'

import { lerp, map, getRandomInteger } from '../../../math/utils'
import { steps } from '../attractorDefinitions'
import { drawOptions } from '..'

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

const drawSpeed = 5

export function Attractor({ points, scale, i, drawOption, particleVariables }) {
  const solidRef = useRef()
  const trajectoryRef = useRef()
  const drawCount = useRef(0)

  const scaleVector = new THREE.Vector3(scale, scale, scale)

  useFrame(({ clock }) => {
    const trajectory = trajectoryRef.current
    const solid = solidRef.current

    if (drawOption === drawOptions.trajectory) {
      const updatedPoints = points.slice(0, drawCount.current)
      trajectory.geometry.points = updatedPoints

      const solidLength = Math.floor(map(drawCount.current, [0, steps], [5, steps * 0.01]))
      solid.geometry.points = updatedPoints.slice(-solidLength)

      drawCount.current = (drawCount.current + drawSpeed) % steps
    } else if (drawOption === drawOptions.multiple) {
      // dashArray wont reset itself
      solid.material.dashArray = 0.99

      solid.material.dashOffset = clock.elapsedTime * 0.03
    } else if (drawOption === drawOptions.particles) {
      const { phase, stability, spin } = particleVariables

      solid.material.dashOffset = i * 2 + clock.elapsedTime * 0.001 * spin

      if (stability === 1) {
        solid.material.dashArray = 0.5 / 10 ** phase
      } else if (stability > 1 && stability < 4) {
        if (clock.elapsedTime % Math.random() < 0.005) {
          // if () ()
          if (stability === 2) {
            solid.material.dashArray = lerp(Math.random(), 0.5 / 10 ** phase, 0.00000007)
          }
          if (stability === 3) {
            solid.material.dashArray = lerp(Math.random(), 0.5 / 10 ** phase, 0.7 / 10 ** phase)
          }
        }
      }
      if (stability === 4) {
        solid.material.dashArray = 0.5 / 10 ** phase

        if (clock.elapsedTime % Math.random() < 0.005) {
          solid.material.dashArray = lerp(Math.random(), 0.5 / 10 ** phase, 0.7 / 10 ** phase)
        }
      }
    }

    if (trajectory) trajectory.material.opacity = lerp(Math.random(), 0.1, 1)

    if (clock.elapsedTime % Math.random() < 0.01) {
      if (trajectory) trajectory.material.color = colors[getRandomInteger(0, colors.length - 1)]

      solid.material.color = colors[getRandomInteger(0, colors.length - 1)]
      solid.material.lineWidth = lerp(Math.random(), 0.1, 1)
    }
  }, [])

  return (
    <>
      <mesh ref={solidRef} scale={scaleVector} raycast={MeshLineRaycast}>
        <meshLine attach="geometry" points={points} />
        <meshLineMaterial
          attach="material"
          lineWidth={1}
          color={colors[0]}
          depthTest={false}
          transparent
          {...(drawOption === 'trajectory' && {
            dashArray: 0,
            dashRatio: 0,
            dashOffset: 0,
          })}
          {...(drawOption === 'multiple' && { dashArray: 0.99, dashRatio: 0.99, dashOffset: 0 })}
          {...(drawOption === 'particles' && { dashArray: 0.99, dashRatio: 0.99 })}
        />
      </mesh>

      {drawOption === drawOptions.trajectory && (
        <mesh ref={trajectoryRef} scale={scaleVector} raycast={MeshLineRaycast}>
          <meshLine attach="geometry" points={points} />
          <meshLineMaterial attach="material" lineWidth={0.1} color={colors[0]} />
        </mesh>
      )}
    </>
  )
}
