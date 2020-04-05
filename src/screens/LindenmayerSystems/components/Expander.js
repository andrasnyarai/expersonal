import React from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

const ExpanderBody = styled.div`
  width: 55px;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Line = styled(animated.div)`
  width: 100%;
  height: 2px;
  border-radius: 2px;
`

const LineInner = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: #3c3c3c;
`

const Hamburger = styled.div`
  width: 22px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ExpanderButton = styled.div`
  cursor: pointer;
  border: #dadada solid 1px;
  padding: 10px;
  border-radius: 5px;
`

const translateYStarting = 'translateY(0px)'
const rotateZStarting = 'rotateZ(0deg)'
const springConfig = { ...config.stiff, velocity: 12 }

export const Expander = ({ open, setOpen }) => {
  const topLine = useSpring({
    config: springConfig,
    reverse: !open,
    delay: open ? 0 : 200,
    to: { transform: 'translateY(5.5px)' },
    from: { transform: translateYStarting },
  })

  const bottomLine = useSpring({
    config: springConfig,
    reverse: !open,
    delay: open ? 0 : 200,
    to: { transform: 'translateY(-6.5px)' },
    from: { transform: translateYStarting },
  })

  const topLineInner = useSpring({
    config: springConfig,
    delay: open ? 200 : 0,
    reverse: !open,
    to: { transform: 'rotateZ(45deg)' },
    from: { transform: rotateZStarting },
  })

  const bottomLineInner = useSpring({
    config: springConfig,
    delay: open ? 200 : 0,
    reverse: !open,
    to: { transform: 'rotateZ(-45deg)' },
    from: { transform: rotateZStarting },
  })

  return (
    <ExpanderBody>
      <ExpanderButton onClick={() => setOpen(o => !o)}>
        <Hamburger>
          <Line style={topLine}>
            <LineInner style={topLineInner} />
          </Line>

          <Line style={bottomLine}>
            <LineInner style={bottomLineInner} />
          </Line>
        </Hamburger>
      </ExpanderButton>
    </ExpanderBody>
  )
}
