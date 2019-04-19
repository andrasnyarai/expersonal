import styled, { keyframes } from 'styled-components'

const saturate = keyframes`
{
    0%,
    100% { filter: saturate(1); }
    50% { filter: saturate(5); }
}`

const hueRotate = keyframes`
{
    0%,
  100% { filter: hue-rotate(0deg); }
   50% { filter: hue-rotate(360deg); }
}`

const Circle = styled.div`
  user-select: none;
  position: relative;
  width: 85vw;
  height: 85vw;
  max-width: 750px;
  max-height: 750px;
  border-radius: 50%;
  @media screen and (orientation: landscape) {
    width: 85vh;
    height: 85vh;
    max-width: 750px;
    max-height: 750px;
  }
  animation: ${saturate} 10s ease infinite, ${hueRotate} 15s ease infinite;
`

export default Circle
