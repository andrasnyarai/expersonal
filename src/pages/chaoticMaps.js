import React from 'react'
import SEO from '../globalComponents/seo'
import ChaoticMapsScreen from '../screens/ChaoticMaps'
import './../fonts/Inter/inter.css'
// import ogImageUrl from '../images/lindenmayerSystems.png'
// update seo
export default function ChaoticMaps() {
  return (
    <>
      <SEO
        title="Bifurcation diagram"
        keywords={['Bifurcation diagram', 'Logistic Map', 'chaotic maps', 'Feigenbaum constants']}
        // ogImageUrl={ogImageUrl}
      />
      <ChaoticMapsScreen />
    </>
  )
}
