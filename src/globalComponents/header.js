import { Link } from 'gatsby'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { color } from 'styled-system'
import { useSpring, config, animated } from 'react-spring'
import Image from './image'

const clipPathCircleMorph = keyframes`{
  0%, 100% {
    clip-path: circle(40%);
  }
  50% {
    clip-path: circle(80%);
  }
}`

const P = styled(animated.p)`
  clip-path: circle(40%);
  animation: ${clipPathCircleMorph} ease 5s infinite;
`

const HeaderContainer = styled.header`
  display: flex;
  height: 200px;
  position: relative;
`

const LogoWrapper = styled.div`
  width: 100px;
`

const H1 = styled.h1`
  left: 9px;
  position: absolute;
  top: 9px;
  font-weight: 200;
`

const ThemeSwitcher = styled.div`
  cursor: pointer;
  perspective: 100px;
  width: 125px;
  height: 125px;
  right: 9px;
  position: absolute;
  top: 9px;
  clip-path: circle(40%);
  animation: ${clipPathCircleMorph} ease 5s infinite;
`

const LightSwitch = styled(animated.div)`
  background-color: #50ade3;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`

const DarkSwitch = styled(animated.div)`
  background-color: #ff5252;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`

const StyledLink = styled(Link)`
  ${color};
  text-decoration: none;
`

export default function Header({ siteTitle, setTheme, currentTheme }) {
  const { transform } = useSpring({
    transform: `rotateY(${currentTheme !== 'light' ? 0 : 180}deg)`,
    config: config.slow,
  })

  return (
    <HeaderContainer>
      <H1>
        <StyledLink to="/" className="siteTitle">
          {siteTitle}
        </StyledLink>
      </H1>
      <LogoWrapper className="logoWrapper">
        <Image imageName={'expr.png'} />
      </LogoWrapper>
      <ThemeSwitcher onClick={() => setTheme(theme => (theme === 'light' ? 'dark' : 'light'))}>
        <LightSwitch style={{ transform }}>
          <P style={{ margin: 'auto', width: '25%', height: '25%', backgroundColor: 'white' }} />
        </LightSwitch>
        <DarkSwitch style={{ transform }}>
          <P style={{ margin: 'auto', width: '25%', height: '25%', backgroundColor: 'black' }} />
        </DarkSwitch>
      </ThemeSwitcher>
    </HeaderContainer>
  )
}
