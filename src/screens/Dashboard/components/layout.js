import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    margin: 0;
    --black: black;
    --white: #fff;
  }
`

export function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={_ => (
        <>
          <GlobalStyle />
          {children}
        </>
      )}
    />
  )
}
