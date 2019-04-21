import { Link } from 'gatsby'
import React from 'react'
import styled, { keyframes } from 'styled-components'
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

const Pointer = styled(animated.div)`
  margin: auto;
  width: 25%;
  height: 25%;
  background-color: ${({ backgroundColor }) => backgroundColor};
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

const Switch = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`

const LightSwitch = styled(Switch)`
  background-color: #50ade3;
`

const DarkSwitch = styled(Switch)`
  background-color: #ff5252;
  backface-visibility: hidden;
`

const StyledLink = styled(Link)`
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
          <Pointer backgroundColor="white" />
        </LightSwitch>
        <DarkSwitch style={{ transform }}>
          <Pointer backgroundColor="black" />
        </DarkSwitch>
      </ThemeSwitcher>
    </HeaderContainer>
  )
}
