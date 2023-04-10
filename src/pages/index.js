import React from 'react'
import SEO from '../globalComponents/seo'
import DashboardScreen from '../screens/Dashboard'
import '../fonts/Inter/inter.css'
import ogImageUrl from '../images/dashboardv2.jpg'

export default function Dashboard() {
  return (
    <>
      <SEO
        title="experson.ai"
        keywords={[
          'generative art',
          'visual experiments',
          'javascript',
          'andras nyarai',
          'fractal',
          'react',
          'three.js',
          'react-three-fiber',
        ]}
        ogImageUrl={ogImageUrl}
      />
      <DashboardScreen />
    </>
  )
}
