import React, { useState, useCallback, useEffect, useRef } from 'react'
import Image from '../image'
import { ThemeSwitcher } from './ThemeSwitcher'
import { HeaderContainer, H1, StyledLink, LogoWrapper } from './style'
function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick(tick => tick + 1)
  }, [])
  return update
}

export default function Header({ siteTitle, setTheme, currentTheme }) {
  const [shine, setShine] = useState(currentTheme === 'light')
  const [forceRender, setForceRender] = useState(false)

  const switchTheme = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))
    setShine(s => !s)
  }

  useEffect(() => {
    if (window !== undefined) {
      setForceRender(true)
    }
  }, [])

  return (
    <HeaderContainer>
      <H1>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </H1>
      <LogoWrapper className="logoWrapper">
        <Image imageName={'expr.png'} />
      </LogoWrapper>

      <ThemeSwitcher forceRender={forceRender} shine={shine} switchTheme={switchTheme} />
    </HeaderContainer>
  )
}
