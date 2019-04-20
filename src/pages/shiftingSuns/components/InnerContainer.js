import styled, { keyframes } from 'styled-components'

const mixBlendModes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]

const mixBlendModeRotate = keyframes`
{

  ${mixBlendModes.map((blendMode, i, array) => {
    return `${(i * 100) / (array.length - 1)}% { mix-blend-mode: ${blendMode} }`
  })}
}`

const saturate = keyframes`
{
    0%,
    100% { filter: saturate(0); }
    50% { filter: saturate(15); }
}`

const InnerContainer = styled.div`
  width: 33vw;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  transition: width 5s ease;
  animation: ${mixBlendModeRotate} 25s ease infinite, ${saturate} 10s linear infinite;
`
export default InnerContainer
