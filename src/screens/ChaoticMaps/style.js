import styled from 'styled-components'

export const CanvasWrapper = styled.div`
  overflow: hidden;
  outline: solid 0.5px;
  touch-action: none;
`

export const Canvas = styled.canvas`
  user-select: none;
  outline: solid 1px;
  cursor: grab;
  transform: ${({ pinchTransform }) => {
    return `translate(${pinchTransform.x}px, ${pinchTransform.y}px) scale(${pinchTransform.scale})`
  }};

  &:active {
    cursor: grabbing;
  }
`
