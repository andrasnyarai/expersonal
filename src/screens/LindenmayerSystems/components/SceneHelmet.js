import React from 'react'
import Helmet from 'react-helmet'

export const SceneHelmet = ({ shouldRenderStackedControls, isDarkMode }) => {
  return (
    <Helmet
      style={[
        {
          cssText: `
            html, body {
                ${shouldRenderStackedControls ? 'position: fixed;overflow: hidden;' : ''}
                margin: 0;
                width: 100%;
                height: 100%;
            }
            html {
                font-family: 'Inter',sans-serif;
                font-size: 14px;
                font-weight: 400;
                background-color: white;
                ${isDarkMode ? 'filter: invert(1);' : ''}
            }
            `,
        },
      ]}
    />
  )
}
