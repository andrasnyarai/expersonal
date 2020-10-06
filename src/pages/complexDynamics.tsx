import React from 'react'
import SEO from '../globalComponents/seo'
import ComplexDynamicsScreen from '../screens/ComplexDynamics'
import './../fonts/Inter/inter.css'
// import ogImageUrl from '../images/ComplexDynamics.png'

export default function ComplexDynamics() {
  return (
    <>
      <SEO
        title="Complex dynamics"
        keywords={['Mandelbrotr Set', 'Burning Ship', 'Julia set', 'Infinite fractal zoom']}
        // ogImageUrl={ogImageUrl}
      />
      <ComplexDynamicsScreen />
    </>
  )
}
