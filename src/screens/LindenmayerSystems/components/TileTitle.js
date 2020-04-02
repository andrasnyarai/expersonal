import styled from 'styled-components'

export const TileTitle = styled.div`
  word-break: break-all;
  position: absolute;
  background-color: white;
  height: 100%;
  width: 100%;
  opacity: ${({ isVisible }) => (isVisible ? 0.7 : 0)};
  user-select: none;
  box-sizing: border-box;
  padding-left: 2px;
  &:active {
    background-color: #c3c3c3;
  }
`
