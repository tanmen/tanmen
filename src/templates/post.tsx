import compareDesc from "date-fns/compareDesc";
import { graphql } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { PostQuery } from "../../types/gatsby-graphql";
import { PostTemplate } from "../components/templates/PostTemplate";
import SEO from "../metas/seo";
import { postPickCountDescOrder } from "../utils/comparetors";
import { convertPostPick } from "../utils/converters";

const Post: FC<{ data: DeepNonNullable<PostQuery>, pageContext: { title: string } }> = ({ data: { markdownRemark: { html }, allMarkdownRemark: { dates, tags } }, pageContext: { title } }) =>
  <>
    <SEO title={title}/>
    <PostTemplate
      active={title}
      html={html}
      tags={tags.map(
        ({ fieldValue: name, totalCount: count, edges }) =>
          ({ name, count, posts: edges.map(convertPostPick) }))
        .sort(postPickCountDescOrder)}
      dates={dates.map(
        ({ fieldValue: name, totalCount: count, edges }) =>
          ({ name, count, posts: edges.map(convertPostPick) }))
        .sort((a, b) => compareDesc(new Date(a.name), new Date(b.name)))}/>
  </>;

export default Post;

export const query = graphql`query Post($title: String) {
  markdownRemark(frontmatter: {title: {eq: $title}}) {
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
