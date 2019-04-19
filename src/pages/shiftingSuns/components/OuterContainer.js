import styled, { keyframes } from 'styled-components'

const hueRotate = keyframes`
{
    0%,
  100% { filter: hue-rotate(0deg); }
   50% { filter: hue-rotate(360deg); }
}`

const OuterContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  animation: ${hueRotate} 15s ease infinite;
`

export default OuterContainer
