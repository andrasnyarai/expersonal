import React, { useState } from 'react'
import Image from '../image'
import { ThemeSwitcher } from './ThemeSwitcher'
import { HeaderContainer, H1, StyledLink, LogoWrapper } from './style'

export default function Header({ siteTitle, setTheme, currentTheme }) {
  const [shine, setShine] = useState(currentTheme === 'light')

  console.log(currentTheme, '___theme')
  const switchTheme = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))
    setShine(s => !s)
  }

  return (
    <HeaderContainer>
      <H1>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </H1>
      <LogoWrapper className="logoWrapper">
        <Image imageName={'expr.png'} />
      </LogoWrapper>

      <ThemeSwitcher shine={shine} switchTheme={switchTheme} />
    </HeaderContainer>
  )
}
