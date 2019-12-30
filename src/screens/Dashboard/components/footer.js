import React from 'react'
import styled from 'styled-components'
import github from 'simple-icons/icons/github'
import instagram from 'simple-icons/icons/instagram'
import linkedin from 'simple-icons/icons/linkedin'
import twitter from 'simple-icons/icons/twitter'

function createInnerHtml({ svg }) {
  return <div dangerouslySetInnerHTML={{ __html: svg }} />
}

const socialIcons = [
  {
    href: 'https://github.com/andrasnyarai',
    iconComponent: createInnerHtml(github),
  },
  {
    href: 'https://www.instagram.com/andandandras',
    iconComponent: createInnerHtml(instagram),
  },
  {
    href: 'https://dev.to/andrasnyarai',
    iconComponent: (
      <svg viewBox="0 32 447.99999999999994 448">
        <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35s5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z" />
      </svg>
    ),
  },
  {
    href: 'https://hu.linkedin.com/in/andras-nyarai',
    iconComponent: createInnerHtml(linkedin),
  },
  {
    href: 'https://twitter.com/andrasai',
    iconComponent: createInnerHtml(twitter),
  },
]

const FooterWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: flex-end;
`

const IconWrapper = styled.a`
  width: 40px;
  margin: 6.5px;
  cursor: pointer;
  opacity: 0.8;

  svg {
    padding: 1px;
  }
`

export default function Footer() {
  return (
    <FooterWrapper className="footerIcons">
      {socialIcons.map(({ href, iconComponent }) => {
        return (
          <IconWrapper key={href} target="_blank" href={href}>
            {iconComponent}
          </IconWrapper>
        )
      })}
    </FooterWrapper>
  )
}
