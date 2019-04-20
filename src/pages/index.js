import React from 'react'
import { Link } from 'gatsby'
import { useSpring, animated } from 'react-spring'

import Layout from '../globalComponents/layout'
import Image from '../globalComponents/image'
import SEO from '../globalComponents/seo'

import useScrollPosition from './lib/useScrollPosition'

import styled from 'styled-components'
import { color } from 'styled-system'

const cards = [
  { backgroundColor: 'mediumvioletred', link: '/shiftingSuns/', title: 'Shifting Suns', imageName: 'shiftingSuns.png' },
  { backgroundColor: 'mediumaquamarine' },
  { backgroundColor: 'mediumblue' },
  { backgroundColor: 'mediumorchid' },
  { backgroundColor: 'mediumpurple' },
  { backgroundColor: 'mediumseagreen' },
  { backgroundColor: 'mediumslateblue' },
  { backgroundColor: 'mediumspringgreen' },
  { backgroundColor: 'mediumturquoise' },
]

const Scene = styled.div`
  position: relative;
  width: 210px;
  height: calc(100 * 8px);
  margin: 10vh auto;
  perspective: 500px;
  @media (max-width: 515px) {
    transform: scale(0.7) translateY(-300px);
  }

  @media (orientation: landscape) and (max-width: 815px) {
    transform: scale(0.7) translateY(-350px);
  }
`

const CardsContainer = styled(animated.article)`
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
`

const Card = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  opacity: 0.5;
  width: 190px;
  height: 120px;
  left: 10px;
  top: 10px;
  transition: filter 0.5s ease;
  cursor: pointer;
  &:hover {
    filter: saturate(3);
  }
`
const ImageContainer = styled.div`
  width: 70%;
  overflow: hidden;
  mix-blend-mode: hard-light;
`
const CardLink = styled(Link)`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
`

const CardTitle = styled.div`
  ${color}
  position: absolute;
  top: -15px;
  text-decoration: none;
  font-weight: 200;
  letter-spacing: 2px;
`

export default function IndexPage() {
  const rotateIntoView = pos => `translateY(${-pos * 2}px) rotateY(${-pos}deg)`

  const scrollPosition = useScrollPosition()
  const [props, set] = useSpring(() => ({ scrollPosition: 0, config: { mass: 1, tension: 50, friction: 10 } }))
  set({ scrollPosition })

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Scene style={{ perspectiveOrigin: `center ${scrollPosition}px` }}>
        <CardsContainer style={{ transform: props.scrollPosition.interpolate(rotateIntoView) }}>
          {cards.map(({ backgroundColor, link = '/', title = '{...}', imageName }, i) => {
            return (
              <Card
                backgroundColor={backgroundColor}
                key={i}
                style={{
                  transform: `rotateY(${(360 / 9) * i}deg) translateZ(${288}px)`,
                }}
              >
                <CardLink to={link}>
                  <CardTitle color={'header'}>{title}</CardTitle>
                </CardLink>
                <ImageContainer>{imageName && <Image imageName={imageName} />}</ImageContainer>
              </Card>
            )
          })}
        </CardsContainer>
      </Scene>
    </Layout>
  )
}
