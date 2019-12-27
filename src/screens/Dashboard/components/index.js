import { Link } from 'gatsby'
import styled from 'styled-components'

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 10px;

  @media (max-width: 515px) {
    grid-template-columns: repeat(1, auto);
  }
`

export const Card = styled.div`
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  transition: filter 0.5s ease;
  cursor: pointer;
  &:hover {
    filter: saturate(3);
  }
`

export const VideoContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  mix-blend-mode: hard-light;
`

export const ContentSkeleton = styled.div`
  padding-bottom: 100%;
`

export const CardLink = styled(Link)`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
`

export const CardTitle = styled.div`
  position: absolute;
  top: -15px;
  text-decoration: none;
  font-weight: 200;
  letter-spacing: 2px;
`

export const Video = styled.video`
  width: 100%;
  height: 100%;
  transform: scale(1.1);
  position: absolute;
`
