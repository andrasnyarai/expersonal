import React from 'react'

import Layout from './components/layout'

import chaoticMapsShowcase from '../../images/chaoticMapsShowcase.mp4'
import lindenmayerSystemsShowcase from '../../images/lindenmayerSystemsShowcase.mp4'
import hausdorffDimensionsShowcase from '../../images/hausdorffDimensionsShowcase.mp4'
import shiftingSunsShowcase from '../../images/shiftingSunsShowcase.mp4'

import { CardsContainer, Card, VideoContainer, CardLink, CardTitle, Video, ContentSkeleton } from './components'

const cards = [
  {
    backgroundColor: 'mediumslateblue',
    link: '/chaoticMaps/',
    title: 'Chaotic Maps & Attractors',
    videoSrc: chaoticMapsShowcase,
  },
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
                <ContentSkeleton>
                  <Video autoPlay muted loop playsInline>
                    <source src={videoSrc} type="video/mp4" />
                  </Video>
                </ContentSkeleton>
              </VideoContainer>
            </Card>
          )
        })}
      </CardsContainer>
    </Layout>
  )
}
