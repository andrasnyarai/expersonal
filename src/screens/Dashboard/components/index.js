import { Link } from 'gatsby'
import { animated } from 'react-spring'
import styled from 'styled-components'

const CardsContainer = styled(animated.article)`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 10px;

  @media (max-width: 515px) {
    grid-template-columns: repeat(1, auto);
  }
`

const Card = styled.div`
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  transition: filter 0.5s ease;
  cursor: pointer;
  &:hover {
    filter: saturate(3);
  }
`
const VideoContainer = styled.div`
  width: 100%;
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

const Video = styled.video`
  width: 100%;
  height: 100%;
  transform: scale(1.1);
`

export { CardsContainer, Card, VideoContainer, CardLink, CardTitle, Video }
