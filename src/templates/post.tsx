import compareDesc from "date-fns/compareDesc";
import { graphql } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { PostQuery } from "../../types/gatsby-graphql";
import { PostTemplate } from "../components/templates/PostTemplate";
import SEO from "../metas/seo";
import { postPickCountDescOrder } from "../utils/comparetors";
import { convertPostPick } from "../utils/converters";

const Post: FC<{ data: DeepNonNullable<PostQuery> }> = ({ data: { markdownRemark: { frontmatter:{title, createdAt, updatedAt, tags},html }, allMarkdownRemark } }) =>
  <>
    <SEO title={title}/>
    <PostTemplate
      title={title}
      createdAt={new Date(createdAt)}
      updatedAt={new Date(updatedAt)}
      tags={tags}
      html={html}
      side={{
        tags: allMarkdownRemark.tags.map(
          ({ fieldValue: name, totalCount: count, edges }) =>
            ({ name, count, posts: edges.map(convertPostPick) }))
          .sort(postPickCountDescOrder),
        dates: allMarkdownRemark.dates.map(
          ({ fieldValue: name, totalCount: count, edges }) =>
            ({ name, count, posts: edges.map(convertPostPick) }))
          .sort((a, b) => compareDesc(new Date(a.name), new Date(b.name)))
      }}/>
  </>;

export default Post;

export const query = graphql`query Post($title: String) {
  markdownRemark(frontmatter: {title: {eq: $title}}) {
    frontmatter {
      title
      createdAt
      updatedAt
      tags
    }
    html
  }
  allMarkdownRemark {
    dates: group(field: frontmatter___createdMonthAt) {
      fieldValue
      totalCount
      edges {
        ...PostPick
      }
    }
    tags: group(field: frontmatter___tags) {
      fieldValue
      totalCount
      edges {
        ...PostPick
      }
    }
  }
}`;
