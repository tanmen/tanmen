import { graphql } from "gatsby";

export const PostPick = graphql`
  fragment PostPick on MarkdownRemarkEdge {
    node {
      excerpt(truncate: true)
      frontmatter {
        title
        createdAt
        tags
      }
    }
  }`;
