import { Link } from 'gatsby'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  height: 200px;
  position: relative;
`

export const LogoWrapper = styled.div`
  width: 100px;
  transition: all 1s ease;
`

export const H1 = styled.h1`
  left: 9px;
  position: absolute;
  top: 9px;
  font-weight: 200;
  mix-blend-mode: difference;
  z-index: 1;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--white);
`
