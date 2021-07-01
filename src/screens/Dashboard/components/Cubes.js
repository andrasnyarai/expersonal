import React, { useRef, useLayoutEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'

import { map, getRandomInteger } from '../../../math/utils'
import { cubeGap, cubeZRows } from '../constants'
import { hollowCubeGeometry } from '../hollowCubeGeometry'

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

function createCubePositions() {
  const positions = []

  for (let x = -5; x < 6; x++) {
    for (let y = -10; y < 6; y++) {
      for (let z = 0; z < cubeZRows; z++) {
        positions.push({
          x: x * cubeGap,
          y: y * cubeGap,
          z: z * cubeGap,
          isStar: getRandomInteger(0, 10) === 0,
        })
      }
    }
  }
  return positions
}

let delta = 0
let time = 0

const clock = new THREE.Clock()
const dummyObject = new THREE.Object3D()
const dummyColor = new THREE.Color()

const cubePositions = createCubePositions()

export function Cubes() {
  const ref = useRef()

  useFrame(() => {
    delta = clock.getDelta()
    time += delta

    cubePositions.forEach(({ x, y, z, isStar }, i) => {
      const boundedZ = (z + time) % (cubeZRows * cubeGap)
      // from the z perspective the front cubes are moved to the back, reusing them.
      // for a continuous animation `t` needs the `boundedZ` value
      const t = time - (Math.abs(x * 0.5) + y * 2 + boundedZ * 1.5) * 0.01
      const wave = roundedSquareWave(t, 0.1, 1, 0.25)

      let scale
      if (time < 1.25) {
        // enter animation
        const t0 = Math.sin(time ** 2 * 4.7)
        if (time < 1) {
          scale = map(t0, [-1, 1], [0.1, 3])
        } else if (time < 1.15) {
          scale = map(t0, [-1, -0.76], [0.1, 0.01])
        } else {
          scale = map(t0, [-0.76, 0.87], [0.01, 1])
        }

        ref.current.material.color.setHSL(map(t0, [-1, 1], [Math.random(), Math.random()]), 1, Math.random())

        // initial star pattern
        if (isStar) {
          const t0 = Math.sin(time * 4.7) // ends at -1

          const color = dummyColor.setHSL(map(t0, [-1, 1], [0, 1]), 1, Math.random() + 0.4)
          ref.current.setColorAt(i, color)
        }
      } else {
        scale = 1 + wave * 0.05

        if (!isStar) {
          const light = -Math.abs(Math.tan((t - 10) * 0.2)) + 1
          const color = dummyColor.setHSL(light, light, light)
          ref.current.setColorAt(i, color)
        }

        if (ref.current.instanceColor) {
          ref.current.instanceColor.needsUpdate = true
        }
      }

      const nx = x * scale
      const ny = y * scale
      dummyObject.position.set(nx, ny, boundedZ)
      dummyObject.rotation.z = map(wave, [-0.95, 0.95], [-Math.PI / 4, 0])

      dummyObject.updateMatrix()
      ref.current.setMatrixAt(i, dummyObject.matrix)
    })

    ref.current.instanceMatrix.needsUpdate = true
  })

  useLayoutEffect(() => {
    const transform = new THREE.Matrix4()

    cubePositions.forEach(({ x, y, z }, i) => {
      transform.setPosition(x, y, z)
      ref.current.setMatrixAt(i, transform)
    })
  }, [])

  return (
    <instancedMesh ref={ref} args={[hollowCubeGeometry, null, cubePositions.length]} scale={[1.5, 1.5, 1.5]}>
      <meshBasicMaterial />
    </instancedMesh>
  )
}
