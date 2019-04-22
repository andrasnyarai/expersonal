import React from 'react'
import { useSpring } from 'react-spring'

import Layout from '../globalComponents/layout'
import Image from '../globalComponents/image'
import SEO from '../globalComponents/seo'
import useScrollPosition from './../lib/useScrollPosition'
import { Scene, CardsContainer, Card, ImageContainer, CardLink, CardTitle } from './../components/Dashboard'

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
                  <CardTitle className="cardTitle">{title}</CardTitle>
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
