import React from 'react'
import SEO from '../globalComponents/seo'
import BifurcationDiagramScreen from '../screens/BifurcationDiagram'
import './../fonts/Inter/inter.css'
// import ogImageUrl from '../images/lindenmayerSystems.png'

export default function BifurcationDiagram() {
  return (
    <>
      <SEO
        title="Bifurcation diagram"
        keywords={['Bifurcation diagram', 'Logistic Map', 'chaos', 'Feigenbaum constants']}
        // ogImageUrl={ogImageUrl}
      />
      <BifurcationDiagramScreen />
    </>
  )
}
