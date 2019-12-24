import React from 'react'

import Layout from './components/layout'

import lindenmayerSystemsShowcase from '../../images/lindenmayerSystemsShowcase.mp4'
import hausdorffDimensionsShowcase from '../../images/hausdorffDimensionsShowcase.mp4'
import shiftingSunsShowcase from '../../images/shiftingSunsShowcase.mp4'

import { CardsContainer, Card, VideoContainer, CardLink, CardTitle, Video } from './components'

const cards = [
  {
    backgroundColor: 'mediumblue',
    link: '/lindenmayerSystems/',
    title: 'Lindenmayer Systems',
    videoSrc: lindenmayerSystemsShowcase,
  },
  {
    backgroundColor: 'mediumspringgreen',
    link: '/hausdorffDimensions/',
    title: 'Hausdorff Dimensions',
    videoSrc: hausdorffDimensionsShowcase,
  },
  {
    backgroundColor: 'mediumvioletred',
    link: '/shiftingSuns/',
    title: 'Shifting Suns',
    videoSrc: shiftingSunsShowcase,
  },
]

export default function Dashboard() {
  return (
    <Layout>
      <CardsContainer>
        {cards.map(({ backgroundColor, link, title, videoSrc }, i) => {
          return (
            <Card backgroundColor={backgroundColor} key={i}>
              <CardLink to={link}>
                <CardTitle className="cardTitle">{title}</CardTitle>
              </CardLink>
              <VideoContainer>
                <Video autoPlay muted loop playsInline>
                  <source src={videoSrc} type="video/mp4" />
                </Video>
              </VideoContainer>
            </Card>
          )
        })}
      </CardsContainer>
    </Layout>
  )
}
