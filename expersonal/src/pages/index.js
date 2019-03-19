import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

export default function IndexPage() {
  useEffect(() => {})
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Image />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}
