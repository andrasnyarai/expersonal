import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { color } from 'styled-system'
import { useSpring, config, animated } from 'react-spring'

const HeaderContainer = styled.header`
  display: flex;
  height: 200px;
`

const H1 = styled.h1`
  left: 15px;
  position: absolute;
  top: 15px;
`

const ThemeSwitcher = styled.div`
  width: 50px;
  height: 50px;
  right: 15px;
  position: absolute;
  top: 15px;
  ${color}
`

const LightSwitch = styled(animated.div)`
  background-color: #50ade3;
  width: 100%;
  height: 100%;
  position: absolute;
  direction: rtl;
`

const DarkSwitch = styled(animated.div)`
  background-color: #ff5252;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
`

const StyledLink = styled(Link)`
  ${color}
`

export default function Header({ siteTitle, setTheme, currentTheme }) {
  const { transform } = useSpring({
    transform: `rotateY(${currentTheme === 'light' ? 0 : 180}deg)`,
    config: config.slow,
  })
  return (
    <HeaderContainer>
      <H1>
        <StyledLink to="/" color={'header'}>
          {siteTitle}
        </StyledLink>
      </H1>
      <ThemeSwitcher onClick={() => setTheme(theme => (theme === 'light' ? 'dark' : 'light'))}>
        <LightSwitch style={{ transform }}>
          <animated.p style={{ transform }}>light</animated.p>
        </LightSwitch>
        <DarkSwitch style={{ transform }}>
          <animated.p style={{ transform, backFaceVisibility: 'hidden' }}>dark</animated.p>
        </DarkSwitch>
      </ThemeSwitcher>
    </HeaderContainer>
  )
}
