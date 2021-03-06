import React from 'react'
import SEO from '../globalComponents/seo'
import DashboardScreen from '../screens/Dashboard'
import '../fonts/Inter/inter.css'
import ogImageUrl from '../images/dashboard.png'

export default function Dashboard() {
  return (
    <>
      <SEO
        title="expersonal"
        keywords={['generative art', 'visual experiments', 'javascript', 'andras nyarai', 'fractal', 'react']}
        ogImageUrl={ogImageUrl}
      />
      <DashboardScreen />
    </>
  )
}
