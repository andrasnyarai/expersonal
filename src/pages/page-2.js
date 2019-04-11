import React, { useState } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import styled, { keyframes } from 'styled-components'
import { useSpring, animated, config } from 'react-spring'
import { useGesture } from 'react-with-gesture'

import '../style/webGradients.css'

const blobTransform = keyframes`
{
    0%,
  100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; }
   14% { border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%; }
   28% { border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%; }
   42% { border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%; }
   56% { border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%; }
   70% { border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%; }
   84% { border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%; }
}`

const hueRotate = keyframes`
{
    0%,
  100% { filter: hue-rotate(0deg) saturate(9); }
   50% { filter: hue-rotate(360deg) saturate(9); }
}`

const mixBlendModeRotate = keyframes`
{

  ${[
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ].map((blendMode, i, wholeArray) => `${(i * 100) / (wholeArray.length - 1)}% { mix-blend-mode: ${blendMode} }`)}
}`

const blobMovement = keyframes`
{
    0%,
  100% { transform: none; }
   50% { transform: translateY(20%) rotateY(10deg); }
}`

const brightness = keyframes`
{
    0%,
  100% { filter: brightness(0) }
   33% { filter: brightness(1) }
   66% { filter: brightness(2) }
}`

const blur = keyframes`
{
    0%,
  100% { filter: blur(5px); }
   50% { filter: saturate(45px); }
}`

const saturate = keyframes`
{
    0%,
  100% { filter: saturate(1); }
   50% { filter: saturate(5); }
}`

const blobShade = keyframes`
{
    0%,
  100% { background-position: 0% 0%; }
   50% { background-position: 100% 100%; }
}`

const Dash = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  animation: ${hueRotate} 15s ease infinite;
  /* background-color: orchid; */
`

const UsersContainer = styled.div`
  width: 50vw;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  &:hover {
    width: 100vw;
  }
  transition: width 5s ease;
  /* overflow: hidden; */

  /* background-color: none; */
  animation: ${mixBlendModeRotate} 25s ease infinite;
`

const Circle = styled(animated.div)`
  position: relative;
  width: 85vw;
  height: 85vw;
  max-width: 750px;
  max-height: 750px;
  border-radius: 50%;
  @media screen and (orientation: landscape) {
    width: 85vh;
    height: 85vh;
    max-width: 750px;
    max-height: 750px;
  }
  animation: ${saturate} 10s ease infinite;
  background: transparent;
  mix-blend-mode: exclusion;
`

const UserBlobContainer = styled.div`
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: fit-content;
  height: 100%;
  transition: all 2s ease 1s;
  animation: ${brightness} 50s ease infinite;
`

const UserBlob = styled.div`
  position: absolute;
  cursor: pointer;
  width: 25vw;
  height: 25vw;
  max-width: 135px;
  max-height: 135px;
  border-radius: 50%;
  background-size: 200% 200%;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  transition: 2s all ease;
  perspective: 1000px;
  box-shadow: inset 0px -20px 100px rgba(255, 255, 255, 0.6);
  transform: translateX(calc(-15vw / 2));
  mix-blend-mode: color-burn;
  animation: ${blobTransform} 50s ease-in-out infinite both alternate, ${blobShade} 60s linear infinite both,
    ${blobMovement} 25s linear infinite both, ${blur} 15s linear infinite both;
  @media screen and (orientation: landscape) {
    transform: translateX(calc(-15vh / 2));
    width: 25vh;
    height: 25vh;
  }
`

const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const grad = [
  'supreme_sky',
  'light_blue',
  'mind_crawl',
  'lily_meadow',
  'sugar_lollipop',
  'sweet_dessert',
  'magic_ray',
  'teen_party',
  'frozen_heat',
  'gagarin_view',
  'fabled_sunset',
  'perfect_blue',
  'strict_november',
]

export default function ShiftingSuns() {
  const [selected, setSelected] = useState(null)
  console.log(selected)
  const { transform } = useSpring({
    transform: `scale(${selected === null ? 1 : 7}) translateY(${
      selected === null ? 0 : 48
    }%) rotateZ(${-selected}deg)`,
    config: config.slow,
  })
  const [handlers, { down, x, y, xDelta, yDelta, xInitial, yInitial }] = useGesture()
  console.log({ down, x, y, xDelta, yDelta, xInitial, yInitial })
  return (
    <Layout>
      <SEO title="Page two" />
      <Dash className="strict_november">
        <UsersContainer className="lily_meadow">
          <div {...handlers} />
          <Circle style={{ transform }}>
            {users.map((user, i, array) => {
              const deg = (360 / array.length) * i
              return (
                <UserBlobContainer
                  key={i}
                  style={{
                    transform: `rotateZ(${deg}deg)`,
                  }}
                >
                  <UserBlob
                    onClick={event => {
                      setSelected(deg)
                      // set({ transform: `scale(7) translateY(48%) rotateZ(55deg)` })
                      // debugger;
                    }}
                    className={grad[i]}
                  />
                </UserBlobContainer>
              )
            })}
          </Circle>
        </UsersContainer>
      </Dash>
      {/* <Link to="/">Go back to the homepage</Link> */}
    </Layout>
  )
}
