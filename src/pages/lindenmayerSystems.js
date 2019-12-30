import React from 'react'
import SEO from '../globalComponents/seo'
import LindenmayerSystemsScreen from '../screens/LindenmayerSystems'
import './../fonts/Inter/inter.css'
import ogImageUrl from '../images/lindenmayerSystems.png'

import spaceFillingCurves from '../screens/LindenmayerSystems/control/spaceFillingCurves'

export default function LindenmayerSystems() {
  return (
    <>
      <SEO
        title="Lindenmayer System"
        keywords={['L-system', 'Space-filling curve', ...Object.keys(spaceFillingCurves)]}
        ogImageUrl={ogImageUrl}
      />
      <LindenmayerSystemsScreen />
    </>
  )
}
