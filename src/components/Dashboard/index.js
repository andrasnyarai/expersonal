import { Link } from 'gatsby'
import { animated } from 'react-spring'
import styled from 'styled-components'

const Scene = styled.div`
  position: relative;
  width: 210px;
  height: 105vh;
  margin: 0 auto;
  perspective: 500px;
  @media (max-width: 515px) {
    transform: scale(0.7) translateY(-200px);
  }

  @media (orientation: landscape) and (max-width: 825px) {
    transform: scale(0.7) translateY(-200px);
  }
`

const CardsContainer = styled(animated.article)`
  position: absolute;
  transform-style: preserve-3d;
`

const Card = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  opacity: 0.5;
  width: 190px;
  height: 120px;
  left: 10px;
  top: 10px;
  transition: filter 0.5s ease;
  cursor: pointer;
  &:hover {
    filter: saturate(3);
  }
`
const ImageContainer = styled.div`
  width: 70%;
  overflow: hidden;
  mix-blend-mode: hard-light;
`
const CardLink = styled(Link)`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
`

const CardTitle = styled.div`
  position: absolute;
  top: -15px;
  text-decoration: none;
  font-weight: 200;
  letter-spacing: 2px;
`

export { Scene, CardsContainer, Card, ImageContainer, CardLink, CardTitle }
