import React from 'react'
import styled from 'styled-components'
import Image from './image'

const FooterWrapper = styled.div`
  display: flex;
  padding-right: 15px;
  justify-content: flex-end;
`

const IconWrapper = styled.a`
  width: 40px;
  margin: 5px;
  cursor: pointer;
`

export default function Footer() {
  return (
    <FooterWrapper className="footerIcons">
      <IconWrapper href="mailto:andrasnyarai@gmail.com">
        <Image imageName={'email.png'} />
      </IconWrapper>
      <IconWrapper target="_blank" href="https://github.com/andrasnyarai">
        <Image imageName={'github.png'} />
      </IconWrapper>
    </FooterWrapper>
  )
}
