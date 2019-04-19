import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import styled from 'styled-components'

const CardContainer = styled.article`
  display: grid;
  grid-gap: 5px;
`

const Card = styled.div`
  /* width: 100%; */
  height: 170px;
  background-color: red;
`

const cards = [1, 2, 3, 4]

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <CardContainer>
        {cards.map((_, i) => {
          return (
            <Card key={i}>
              <Link to="/shiftingSuns/">Go to page 2</Link>
            </Card>
          )
        })}
      </CardContainer>

      {/* <Image /> */}
    </Layout>
  )
}
