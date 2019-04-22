import React, { useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import styled, { createGlobalStyle } from 'styled-components'

import './../fonts/Inter/inter.css'

const windowCheck = typeof window !== 'undefined'
const localStorageCheck = typeof localStorage !== 'undefined'
const documentCheck = typeof document !== 'undefined'

// windowCheck &&
//   (window.__setThemeClass = theme => {
//     documentCheck && (document.getElementById('___gatsby').classList = theme)
//   })

// windowCheck && window.__setThemeClass(localStorage.getItem('theme'))

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
  }
  .light {
    .background {
      background-color: #fff;
    }
    .siteTitle, .cardTitle {
      color: #111;
    }
  }
  .dark {
    .background {
      background-color: #111;
    }
    .siteTitle, .cardTitle {
      color: #fff;
    }
    .logoWrapper {
      filter: invert(1);
    }
  }
`

const MainWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  padding: 2.625rem 1.3125rem;
`

const Background = styled.div`
  transition: all 0.5s ease;
  overflow: hidden;
`

export default function Layout({ children }) {
  const [currentTheme, setTheme] = useState((localStorageCheck && localStorage.getItem('theme')) || 'light')
  useEffect(() => {
    localStorageCheck && localStorage.setItem('theme', currentTheme)
    documentCheck && (document.getElementById('___gatsby').classList = currentTheme)
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
        <Background className="background">
          <MainWrapper>
            <GlobalStyle />
            <Header siteTitle={data.site.siteMetadata.title} setTheme={setTheme} currentTheme={currentTheme} />
            <div>
              <main>{children}</main>
            </div>
          </MainWrapper>
        </Background>
      )}
    />
  )
}
