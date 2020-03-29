import React from 'react'
import styled from 'styled-components'

const A = styled.div`
  height: 50px;
  margin: 5px;
  overflow: hidden;
  overflow-x: scroll;
`
const B = styled.div`
  background-color: red;
  width: 55px;
`

const C = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(9, 1fr);
`

export const SimpleSelector = ({ options }) => (
  <A>
    <C>
      {options.map(i => (
        <B key={i}></B>
      ))}
    </C>
  </A>
)
