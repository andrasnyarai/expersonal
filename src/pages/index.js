import React from 'react'
import SEO from '../globalComponents/seo'
import DashboardScreen from '../screens/Dashboard'
import '../fonts/Inter/inter.css'

export default function Dashboard() {
  return (
    <>
      <SEO
        title="expersonal"
        keywords={['generative art', 'visual experiments', 'javascript', 'andras nyarai', 'fractal']}
      />
      <DashboardScreen />
    </>
  )
}
