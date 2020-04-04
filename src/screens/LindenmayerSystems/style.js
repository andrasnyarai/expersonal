import styled from 'styled-components'

export const Canvas = styled.canvas`
  display: block;
  max-width: inherit;
  max-height: inherit;
`

export const CanvasWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  align-self: center;
  justify-self: center;

  @media screen and (max-height: 450px) and (orientation: landscape) {
    max-width: 200px;
    max-height: 200px;
  }
`

export const SceneWrapper = styled.div`
  /* background-color: white; */
  display: flex;
  flex-direction: column;
`

export const CanvasSkeleton = styled.div`
  max-height: 600px;
  width: 100%;
  height: 100vw;
`
