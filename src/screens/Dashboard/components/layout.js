import React, { useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import Footer from './footer'
import styled, { createGlobalStyle } from 'styled-components'

const localStorageCheck = typeof localStorage !== 'undefined'
const documentCheck = typeof document !== 'undefined'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    --black: #111;
    --white: #fff;
  }

  .background {
    background-color: var(--bgColor);
  }

  .cardTitle {
    color: var(--accentColor);
  }

  .light {
    --bgColor: var(--white);
    --accentColor: var(--black);
  }

  .dark {
    --bgColor: var(--black);
    --accentColor: var(--white);

    .logoWrapper {
      filter: invert(1);
    }
    .footerIcons {
      filter: invert(1) contrast(0.4);
    }
    video {
      filter: invert(1);
    }
  }
`

const MainWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 70rem;
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
            <Footer />
          </MainWrapper>
        </Background>
      )}
    />
  )
}
