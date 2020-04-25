import React from 'react'
import SEO from '../globalComponents/seo'
import ChaoticMapsScreen from '../screens/ChaoticMaps'
import './../fonts/Inter/inter.css'
import ogImageUrl from '../images/chaoticMaps.jpg'

export default function ChaoticMaps() {
  return (
    <>
      <SEO
        title="Chaotic Maps & Attractors"
        keywords={[
          'Bifurcation diagrams',
          'Logistic Map',
          'chaotic maps',
          'Feigenbaum constants',
          'Gauss Map',
          'Peter de Jong Attractor',
          'Ikeda Map',
          'Henon Map',
        ]}
        ogImageUrl={ogImageUrl}
      />
      <ChaoticMapsScreen />
    </>
  )
}
