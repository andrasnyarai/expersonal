import styled, { keyframes } from 'styled-components'

const morph = keyframes`
{
    0%,
  100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; }
   14% { border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%; }
   28% { border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%; }
   42% { border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%; }
   56% { border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%; }
   70% { border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%; }
   84% { border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%; }
}`

const float = keyframes`
{
    0%,
  100% { transform: none; }
   50% { transform: translateY(20%) rotateY(10deg); }
}`

const blur = keyframes`
{
    0%,
  100% { filter: blur(5px); }
   50% { filter: saturate(45px); }
}`

const shade = keyframes`
{
    0%,
  100% { background-position: 0% 0%; }
   50% { background-position: 100% 100%; }
}`

const Blob = styled.div`
  pointer-events: none;
  position: absolute;
  width: 15vw;
  height: 15vw;
  max-width: 135px;
  max-height: 135px;
  border-radius: 50%;
  background-size: 200% 200%;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  transition: 2s all ease;
  box-shadow: inset 0px -20px 100px rgba(255, 255, 255, 0.6);
  transform: translateX(calc(-15vw / 2));
  animation: ${morph} 0.5s ease-in-out infinite both alternate, ${shade} 60s linear infinite both,
    ${float} 25s linear infinite both, ${blur} 15s linear infinite both;
  @media screen and (orientation: landscape) {
    transform: translateX(calc(-15vh / 2));
    width: 25vh;
    height: 25vh;
  }
`

export default Blob
