import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { useGesture } from 'react-with-gesture'

import SEO from '../../components/seo'

import '../../style/webGradients.css'

import { OuterContainer, InnerContainer, Circle, BlobContainer, Blob } from './components'
import mixBlendModes from './lib/mixBlendModes'
import planeColors from './lib/planeColors'

const blobs = [
  { gradient: 'supreme_sky' },
  { gradient: 'light_blue' },
  { gradient: 'mind_crawl' },
  { gradient: 'lily_meadow' },
  { gradient: 'sugar_lollipop' },
  { gradient: 'young_passion' },
  { gradient: 'fabled_sunset' },
  { gradient: 'teen_party' },
  { gradient: 'frozen_heat' },
]

const createBlob = ({ gradient }, i, array) => {
  const segment = (360 / array.length) * i
  return (
    <BlobContainer key={i} segment={segment}>
      <Blob className={gradient} />
    </BlobContainer>
  )
}

const activatePanel = x => {
  const panels = 3
  const limiter = window.innerWidth / (panels - 1)
  const panelLimit = x / limiter
  return Math.abs(Math.round(panelLimit))
}

const setPlaneValue = (y, callback, stack) => {
  const limiter = window.innerHeight / (stack.length - 1)
  const stackPieceLimit = y / limiter
  const selectedIndex = Math.abs(Math.round(stackPieceLimit))
  callback(stack[selectedIndex])
}

export default function ShiftingSuns() {
  const [handlers, { xy }] = useGesture()
  const [outerBackground, setOuterBackground] = useState(planeColors[0])
  const [innerBackground, setInnerBackground] = useState(planeColors[0])
  const [mixBlendMode, setMixBlendMode] = useState('multiply')

  useEffect(() => {
    const [x, y] = xy
    const activeColumnNumber = activatePanel(x)

    if (activeColumnNumber === 0) {
      setPlaneValue(y, setInnerBackground, planeColors)
    } else if (activeColumnNumber === 1) {
      setPlaneValue(y, setMixBlendMode, mixBlendModes)
    } else if (activeColumnNumber === 2) {
      setPlaneValue(y, setOuterBackground, planeColors)
    }
  }, [xy])

  return (
    <div {...handlers()}>
      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML: `
            document.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive:false });`,
          },
        ]}
        style={[
          {
            cssText: `
            html, body {
              margin: 0;
              height: 100%;
              overscroll-behavior: none;
            }`,
          },
        ]}
      />
      <SEO title="Shifting Suns" />
      <OuterContainer style={{ backgroundColor: outerBackground }}>
        <InnerContainer style={{ backgroundColor: innerBackground }}>
          <Circle style={{ mixBlendMode }} className={'mean_fruit'}>
            {blobs.map(createBlob)}
          </Circle>
        </InnerContainer>
      </OuterContainer>
    </div>
  )
}
