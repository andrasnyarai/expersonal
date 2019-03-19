import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: red;
`

export default function Header({ siteTitle }) {
  return (
    <header>
      <h1 style={{ margin: 0 }}>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </h1>
    </header>
  )
}
