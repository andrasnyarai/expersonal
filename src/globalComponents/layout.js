import React, { useState, useLayoutEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Header from './header'
import themes from '../style/theme'
import styled, { createGlobalStyle } from 'styled-components'
import { backgroundColor } from 'styled-system'

import './../fonts/Inter/inter.css'

const localStorageCheck = typeof localStorage !== 'undefined'

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
  background-color: ${({ theme }) => theme.colors.background};
  transition: all 0.5s ease;
  overflow: hidden;
`

export default function Layout({ children }) {
  const [currentTheme, setTheme] = useState((localStorageCheck && localStorage.getItem('theme')) || 'light')
  const [t, sT] = useState(themes[currentTheme])
  useLayoutEffect(() => {
    localStorageCheck && localStorage.setItem('theme', currentTheme)
    sT(themes[currentTheme])
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
        <ThemeProvider theme={t}>
          <Background>
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
