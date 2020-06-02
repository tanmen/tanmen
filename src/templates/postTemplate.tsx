import React, { FC } from "react"
import { graphql } from "gatsby"
import { PostQuery } from "../../types/gatsby-graphql"

const Template: FC<{ data: PostQuery }> = ({ data }) => {
  const { html, frontmatter } = data?.file?.childMarkdownRemark ?? {}
  const { title, create, update } = frontmatter ?? {}
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{title}</h1>
        <div>作成日: {create}</div>
        <div>更新日: {update}</div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html ?? '' }}
        />
      </div>
    </div>
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
