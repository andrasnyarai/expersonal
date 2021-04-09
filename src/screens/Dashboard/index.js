import React, { useRef, useState,useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame,extend, useThree, useResource, useLoader, useUpdate } from 'react-three-fiber'
import * as THREE from 'three'
import { BufferGeometryUtils }from 'three/examples/jsm/utils/BufferGeometryUtils'

import Layout from './components/layout'

import { useLayoutEffect } from 'react'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

import { map, clamp } from '../../math/utils'

import styled from 'styled-components'


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

useLoader.preload(THREE.FontLoader, '/Relative_Book.json')

function Text({ afterRender, children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }) {
  const font = useLoader(THREE.FontLoader, '/Relative_Book.json') // this causes loading animation to junk
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
    [font]
  )


  useFrame(({clock}) => {
    if (clock.elapsedTime < 1.15) {
      ref.current.material.opacity = 0;
      return
    }

    const l = -Math.abs(Math.tan((clock.elapsedTime - 10) * 0.2)) + 1
    const opacity = -l + 0.2
    ref.current.material.opacity = opacity;

    if (opacity < 0.4 && opacity > 0.1) {
      if (clock.elapsedTime % Math.random() < 0.1) {
        ref.current.material.opacity = 0.8;
      }
    }
  })

  return (
    <mesh scale={[0.1 * size, 0.1 * size, 0.1]} ref={ref}>
      <textBufferGeometry args={[children, config]} />
      <meshNormalMaterial transparent opacity={0} />
    </mesh>
  )
}

function Text2({ children, size = 1, position}) {
  const font = useLoader(THREE.FontLoader, '/Relative_Book.json')
  const ref = useRef()
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
    [font]
  )

  return (
    <mesh position={position} scale={[0.1 * size, 0.1 * size, 0.1]} ref={ref}>
      <textBufferGeometry args={[children, config]} />
      <meshNormalMaterial transparent opacity={1} />
    </mesh>
  )
}

function Logo() {
  const isSmallScreen = window.innerWidth < 450
  return (
    <group position={[isSmallScreen ? -15 : -25, 10, (23-7)*4]}>
      <Suspense fallback={null}>
        <Text children="expersonal" size={isSmallScreen ? 1.5 : 2} />
      </Suspense>
    </group>
  )
}

extend({ EffectComposer, ShaderPass, SavePass, RenderPass, UnrealBloomPass,SMAAPass, BokehPass })

const links = [
  {
    link: '/chaoticMaps/',
    title: 'chaotic maps',
    backgroundColor: 'mediumvioletred',
  },
  {
    link: '/lindenmayerSystems/',
    title: `space-filling\ncurves`,
    backgroundColor: 'mediumorchid',
  },
  {
    link: '/hausdorffDimensions/',
    title: 'fractals',
    backgroundColor: 'mediumslateblue',
  },
]

// const hollowCube
const matrix = new THREE.Matrix4();

const lineSize = 1
const lineDepth = .03;

const lineGeometry = new THREE.BoxBufferGeometry(lineSize, lineDepth,lineDepth);

const frontLineGeometry = lineGeometry.clone().applyMatrix(matrix)
const backLineGeometry = lineGeometry.clone().applyMatrix(matrix)
const leftLineGeometry = lineGeometry.clone().applyMatrix(matrix)
const rightLineGeometry = lineGeometry.clone().applyMatrix(matrix)


frontLineGeometry.translate(0,0,lineSize/2-lineDepth/2)
backLineGeometry.translate(0,0,-(lineSize/2-lineDepth/2))

leftLineGeometry.rotateY(Math.PI/2)
leftLineGeometry.translate(-(lineSize/2-lineDepth/2),0,0)

rightLineGeometry.rotateY(Math.PI/2)
rightLineGeometry.translate((lineSize/2-lineDepth/2),0,0)


const topFrame = BufferGeometryUtils.mergeBufferGeometries([frontLineGeometry, backLineGeometry, leftLineGeometry, rightLineGeometry])

const bottomFrame = topFrame.clone().applyMatrix(matrix)
const frontFrame = topFrame.clone().applyMatrix(matrix)
const backFrame = topFrame.clone().applyMatrix(matrix)

topFrame.translate(0,-(lineSize/2-lineDepth/2),0)
bottomFrame.translate(0,lineSize/2-lineDepth/2,0)

frontFrame.rotateX(Math.PI/2)
frontFrame.translate(0,0,lineSize/2-lineDepth/2)

backFrame.rotateX(Math.PI/2)
backFrame.translate(0,0,-(lineSize/2-lineDepth/2))

const geometry = BufferGeometryUtils.mergeBufferGeometries([topFrame, bottomFrame, frontFrame, backFrame])


function createCubePositions() {
  const positions = []
  const gap = 4

  for (let x = -5; x < 6; x++) {
    for (let y = -10; y < 6; y++) {
      for (let z = 0; z < 24; z++) {
        const vector = new THREE.Vector3(x*gap, y*gap, z*gap);
        const rn = Math.floor(Math.random() * (10 - 0 + 1) + 0) // extract to function
        const isStar = rn === 0;
        positions.push({ vector, isStar })
      }
    }
  }
  return positions
}

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

const cubePositions = createCubePositions()

let delta = 0
let time = 0

const clock = new THREE.Clock();
const dummy = new THREE.Object3D();

function Cubes() {
  const ref = useRef()

  useFrame(() => {
    delta = clock.getDelta();
    time += delta;

    // can be a for loop
    cubePositions.forEach(({ vector, isStar } ,i) => {
      const z = (vector.z + time) % (24*4); // z limit

      const t = time - ((Math.abs(vector.x * 0.5) + (vector.y * 2) + (z * 1.5))) / 80
      const wave = roundedSquareWave(t, 0.1, 1, 1 / 4)

      let scale
      if (time < 1.25) {
        const t0 = Math.sin(time**2*4.7)
        if (time < 1) {
          scale = map(t0, [-1, 1], [0.1,3])
        } else if (time < 1.15) {
          scale = map(t0, [-1, -0.76], [0.1,0.01])
        } else {
          scale = map(t0, [-0.76, 0.87], [0.01,1])
        }

        ref.current.material.color.setHSL(map(t0, [-1, 1], [Math.random(),Math.random()]), 1, Math.random());

        // initial star pattern
        if (isStar) {

          const t0 = Math.sin((time)*(4.7)) // ends at -1
  
          const color = new THREE.Color().setHSL(map(t0, [-1, 1], [0,1]), 1, Math.random() + 0.4)
          ref.current.setColorAt(i, color);

          
        }

      } else {
        scale = 1 + wave * 0.05

        if (!isStar) {
          const l = -Math.abs(Math.tan((t - 10) * 0.2)) + 1;
          const color = new THREE.Color().setHSL(l,l,l);
          ref.current.setColorAt(i, color);
        }

        if (ref.current.instanceColor) {
          ref.current.instanceColor.needsUpdate = true
        }
      }

      const x = vector.x * scale;
      const y = vector.y * scale
      dummy.position.set(x, y, z);
      dummy.rotation.z = map(wave, [-0.95, 0.95], [-Math.PI/4,0])

      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    })

    ref.current.instanceMatrix.needsUpdate = true
  })

  // instance coloring
  // https://codesandbox.io/s/exciting-cdn-r70fx?file=/src/App.js
  // https://codesandbox.io/s/r3f-instanced-colors-8fo01?file=/src/index.js:1983-2082


  useLayoutEffect(() => {
    const transform = new THREE.Matrix4()

    cubePositions.forEach(({ vector }, i) => {
      const { x, y, z } = vector
      transform.setPosition(x, y, z)
      ref.current.setMatrixAt(i, transform)
    })

  }, [])

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, null, cubePositions.length]}
      scale={[1.5, 1.5, 1.5]}
    >
      <meshBasicMaterial />
    </instancedMesh>
  )
}

function Anchor({position, title, link, backgroundColor}) {

  const ref = useRef()

  const [hovered, setHover] = useState(false)
  // loading for assets
  // use spring to set hover states
  // https://github.com/thedevelobear/react-three-fibear/blob/e38b303e0149898792cfcd203ac3df5789deb890/src/components/Loading.js

  return (
    <group  position={position}>
      <mesh ref={ref} position={[0, 0, -0.5]}
        onClick={(event) => {
          event.stopPropagation()  
          window.open(link,'_blank');
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHover(true)
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHover(false)
        }}
      >
        <planeBufferGeometry  args={[1,1,1,1]}/>
        <meshBasicMaterial transparent opacity={0.7} color={hovered ? 'mediumspringgreen' : backgroundColor} />
      </mesh>

      <Suspense fallback={null}>
        <Text2 size={0.7} position={[-0.35, 0.35, 0.5]} children={title}/>
      </Suspense>


      <mesh  args={[geometry,null]}>
        <meshNormalMaterial/>
      </mesh>
    </group>
  )
}

function Bloom() {
  const { gl, camera, size, scene } = useThree()
  const composer = useRef()
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 1.5, 1, 0]} />
      <sMAAPass attachArray="passes" args={[size.width, size.height]} />
    </effectComposer>
  )
}

function Camera() {
  useFrame(({ camera }) => {

    // use  ref
    const y = (document.getElementById('scroller').scrollTop)

    if (y >= 1000) {
      camera.position.y = -(1000 * 0.07)
      camera.position.z = (23*4) - ((y-1000) * 0.005)
    } else {
      camera.position.y = -y * 0.07
      camera.position.z = 23*4
    }
  })

  return null
}

export default function Dashboard() {

  const scrollerRef = useRef()
  const scrolledRef = useRef()


  return (
    <Layout>
      <Scroller ref={scrollerRef}  id="scroller">

      <Canvas  
        className="webglCanvas"
        pixelRatio={window.devicePixelRatio}
        gl={{ antialias: false  }}
        onCreated={(canvasCtx) => {
          //maybe
          canvasCtx.gl.physicallyCorrectLights = true;
        }}
        style={{height:window.innerHeight, position: 'sticky', top: 0}}
        camera={{ position: [0, 5, 23*4], fov: 100 }}
      >
        <Camera />
        <Logo />
        <Cubes />
        <Bloom />
        <fog attach="fog" args={['black', 30, 40]} />

        <Anchor  {...links[0]} position={[0,-(1000 * 0.07), ((23-2)*4)]}>
          <icosahedronBufferGeometry args={[1.0]}/>
        </Anchor>

        <Anchor  {...links[1]} position={[0,-(1000 * 0.07), ((23-4)*4)]}>
          <octahedronBufferGeometry args={[1.0]}/>
        </Anchor>

        <Anchor  {...links[2]} position={[0,-(1000 * 0.07), ((23-6)*4)]}>
          <tetrahedronBufferGeometry args={[1.0]}/>
        </Anchor>

      </Canvas>
      <div ref={scrolledRef} style={{height:15000}}>
      </div>
      </Scroller>
    </Layout>
  )
}
