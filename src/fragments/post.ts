import { graphql } from "gatsby";

export const PostPick = graphql`
  fragment PostPick on MarkdownRemarkEdge {
    node {
      headings {
        value
        depth
      }
      excerpt(truncate: true)
      frontmatter {
        createdAt
        tags
      }
    }
  }`;
