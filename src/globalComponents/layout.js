import React, { useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Header from './header'
import theme from './../style/theme'
import styled, { createGlobalStyle } from 'styled-components'
import { backgroundColor } from 'styled-system'

import './../fonts/Inter/inter.css'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
  }
`

const MainWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  padding: 2.625rem 1.3125rem;
`

const Background = styled.div`
  ${backgroundColor};
  transition: all 0.5s ease;
  overflow: hidden;
`

export default function Layout({ children }) {
  const [currentTheme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  useEffect(() => {
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

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
      render={data => (
        <ThemeProvider theme={theme[currentTheme]}>
          <Background backgroundColor={'background'}>
            <MainWrapper>
              <GlobalStyle />
              <Header siteTitle={data.site.siteMetadata.title} setTheme={setTheme} currentTheme={currentTheme} />
              <div>
                <main>{children}</main>
              </div>
            </MainWrapper>
          </Background>
        </ThemeProvider>
      )}
    />
  )
}
