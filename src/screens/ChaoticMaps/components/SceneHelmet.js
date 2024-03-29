import React from 'react'
import Helmet from 'react-helmet'

export function SceneHelmet() {
  return (
    <Helmet
      style={[
        {
          cssText: `
          html {
            font-size: 16px;
            font-weight: 400;
            font-family: 'Inter',sans-serif;
          }
          body {
            margin: 0;
            width: 100%;
            height: 100%;
            overscroll-behavior: none;
          }
        `,
        },
      ]}
    />
  )
}
