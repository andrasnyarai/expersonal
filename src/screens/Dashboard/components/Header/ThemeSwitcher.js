import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const sunSize = 50
const moonMaskSize = 45
const sunBeamWidth = 7.5
const sunBeamHeight = 12.5
const numberOfBeams = 12

function calculateSunBeamPosition({ i, shine }) {
  const halfSunSize = sunSize / 2
  const x = halfSunSize - sunBeamWidth / 2
  const y = halfSunSize - sunBeamHeight / 2
  let sunBeamPosition = `translateX(${x}px) translateY(${y}px) rotateZ(${(360 / numberOfBeams) * i}deg)`
  if (shine) {
    sunBeamPosition += 'translateY(37px)'
  }
  return sunBeamPosition
}

const ThemeSwitcherBody = styled.div`
  background-color: var(--bgColor);
  border-radius: 50%;
  filter: ${({ shine }) => `blur(${shine ? 2 : 1}px) contrast(10);`};
  mix-blend-mode: ${({ shine }) => (shine ? 'inherit' : 'lighten')};
  transition: all 0.1s ease;
  width: 95px;
  height: 95px;
  position: absolute;
  right: 9px;
  top: 9px;
`

const Sun = styled.div`
  cursor: pointer;
  width: ${sunSize}px;
  height: ${sunSize}px;
  border-radius: 50%;
  background-color: var(--accentColor);
  position: absolute;
  top: calc(50% - ${sunSize / 2}px);
  left: calc(50% - ${sunSize / 2}px);
`
const SunBeam = styled.div`
  width: ${sunBeamWidth}px;
  height: ${sunBeamHeight}px;
  position: absolute;
  transform: ${calculateSunBeamPosition};
  transition: ${({ shine }) => `transform ${shine ? 0.8 : 0.1}s cubic-bezier(0.81, 1.16, 0.31, 1.15)`};
  background-color: ${({ shine }) => (shine ? 'var(--accentColor)' : 'transparent')};
`

const MoonMask = styled.div`
  width: ${({ shine }) => (shine ? '0px' : `${moonMaskSize}px`)};
  height: ${({ shine }) => (shine ? '0px' : `${moonMaskSize}px`)};
  border-radius: 50%;
  background-color: ${({ shine }) => (shine ? 'var(--accentColor)' : 'var(--bgColor)')};
  position: absolute;
  top: calc(50% - ${moonMaskSize / 2}px);
  left: calc(50% - 7px);
  transition: ${({ shine }) => `all ${shine ? 0.3 : 0.65}s cubic-bezier(0.22, 0.82, 0.29, 0.99)`};
  will-change: width, height;
`

export const ThemeSwitcher = ({ shine, switchTheme }) => {
  const [, forceUpdate] = useState(false)

  useEffect(() => {
    forceUpdate()
  }, [forceUpdate])

  return (
    <ThemeSwitcherBody shine={shine}>
      <Sun onClick={switchTheme}>
        {[...new Array(numberOfBeams).keys()].map(i => (
          <SunBeam shine={shine} key={i} i={i} />
        ))}
      </Sun>
      <MoonMask shine={shine} />
    </ThemeSwitcherBody>
  )
}
