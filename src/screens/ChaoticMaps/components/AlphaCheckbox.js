import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 15px;
`

export function AlphaCheckbox({ shouldPreservePrevious, setShouldPreservePrevious }) {
  return (
    <Container>
      <input type="checkbox" checked={shouldPreservePrevious} onChange={() => setShouldPreservePrevious(s => !s)} />
      <span> preserve previous</span>
    </Container>
  )
}
