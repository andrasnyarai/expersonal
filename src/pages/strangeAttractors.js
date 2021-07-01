import React from 'react'
import SEO from '../globalComponents/seo'
import StrangeAttractorsScreen from '../screens/StrangeAttractors'
import './../fonts/Inter/inter.css'
// import ogImageUrl from '../images/strangeAttractors.png'

export default function StrangeAttractors() {
  return (
    <>
      <SEO
        title="Strange Attractors"
        keywords={['Lorenz Attractor', 'Lorenz System']}
        // ogImageUrl={ogImageUrl}
      />
      <StrangeAttractorsScreen />
    </>
  )
}
