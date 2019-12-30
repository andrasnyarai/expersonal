import React from 'react'
import SEO from '../globalComponents/seo'
import ShiftingSunsScreen from '../screens/ShiftingSuns'

import ogImageUrl from '../images/shiftingSuns.png'

export default function ShiftingSuns() {
  return (
    <>
      <SEO title="Shifting Suns" keywords={['CSS Blob', 'Gooey Effect', 'mix-blend-mode']} ogImageUrl={ogImageUrl} />
      <ShiftingSunsScreen />
    </>
  )
}
