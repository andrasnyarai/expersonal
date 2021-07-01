import React from 'react'
import SEO from '../globalComponents/seo'
import HausdorffDimensionsScreen from '../screens/HausdorffDimensions'
import './../fonts/Inter/inter.css'
import ogImageUrl from '../images/hausdorffDimensions.jpg'

import fractals from '../screens/HausdorffDimensions/fractals'

export default function HausdorffDimensions() {
  return (
    <>
      <SEO title="Hausdorff dimensions" keywords={Object.keys(fractals)} ogImageUrl={ogImageUrl} />
      <HausdorffDimensionsScreen />
    </>
  )
}
