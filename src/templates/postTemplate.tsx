import { graphql } from "gatsby"
import React, { FC } from "react"
import { PostQuery } from "../../types/gatsby-graphql"
import Layout from "../components/layout"

const Template: FC<{ data: PostQuery }> = ({ data }) => {
  const { html, frontmatter } = data?.file?.childMarkdownRemark ?? {}
  const { title, create, update } = frontmatter ?? {}
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{title}</h1>
          <div>作成日: {create}</div>
          <div>更新日: {update}</div>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          />
        </div>
      </div>
    </Layout>
  )
}
export default Template
export const pageQuery = graphql`
    query Post($relativePath: String!) {
        file(relativePath: { eq: $relativePath }, sourceInstanceName: { eq: "posts" }) {
            childMarkdownRemark {
                html
                frontmatter {
                    title
                    create
                    update
                }
            }
        }
    }
`
