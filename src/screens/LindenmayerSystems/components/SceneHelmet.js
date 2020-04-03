import React from 'react'
import Helmet from 'react-helmet'

export const SceneHelmet = ({ shouldRenderStackedControls, isDarkMode }) => {
  return (
    <Helmet
      style={[
        {
          cssText: `
            html, body {
                margin: 0;
                width: 100%;
                height: 100%;
                position: absolute;
                min-height: 100vh;
                ${shouldRenderStackedControls ? 'overflow: hidden;' : ''};
            }

            html {
                font-family: 'Inter',sans-serif;
                font-size: 13px;
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
