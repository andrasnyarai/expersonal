import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

import { lerp } from '../../../math/utils'

extend({ EffectComposer, ShaderPass, SavePass, RenderPass, UnrealBloomPass })

export function Effects() {
  const { gl, camera, size, scene } = useThree()
  const composer = useRef()
  const bloomRef = useRef()
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)

  useFrame(({ clock }) => {
    if (clock.elapsedTime % Math.random() < 0.01) {
      const bloom = bloomRef.current
      bloom.strength = lerp(Math.random(), 0.75, 2.25)
      bloom.radius = lerp(Math.random(), 0.75, 1.25)
    }
  })

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass ref={bloomRef} attachArray="passes" args={[aspect, 2, 1, 0]} />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
    </effectComposer>
  )
}
