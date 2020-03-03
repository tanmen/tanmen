import { Link } from "gatsby"
import React, { FC } from "react"
import Image from "../components/image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ProfilePage: FC = () => (
  <Layout>
    <SEO title="Tanmen" />
    <h1>Hi tanmen</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/">Go Home</Link>
  </Layout>
)

export default ProfilePage
