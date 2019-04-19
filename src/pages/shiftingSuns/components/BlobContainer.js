import styled, { keyframes } from 'styled-components'

const brightness = keyframes`
{
    0%,
    100% { filter: brightness(0) }
    33% { filter: brightness(1) }
    66% { filter: brightness(2) }
}`

const BlobContainer = styled.div`
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: fit-content;
  height: 100%;
  transition: all 2s ease 1s;
  animation: ${brightness} 5s ease infinite;
  transform: ${({ segment }) => `rotateZ(${segment}deg)`};
`
export default BlobContainer
