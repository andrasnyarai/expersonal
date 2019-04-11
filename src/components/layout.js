import React, { useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Header from './header'
import theme from './../style/theme'

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
          <>
            <Header siteTitle={data.site.siteMetadata.title} setTheme={setTheme} currentTheme={currentTheme} />
            <div>
              <main>{children}</main>
            </div>
          </>
        </ThemeProvider>
      )}
    />
  )
}
