import compareDesc from "date-fns/compareDesc";
import { graphql } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { TagPostsQuery } from "../../types/gatsby-graphql";
import { PostsTemplate } from "../components/templates/PostsTemplate";
import SEO from "../metas/seo";
import { postPickCountDescOrder } from "../utils/comparetors";
import { convertPostPick } from "../utils/converters";

const TagPosts: FC<{ data: DeepNonNullable<TagPostsQuery>, pageContext: { tag: string } }> = ({ data: { posts: { edges }, data: { tags, dates } }, pageContext: { tag } }) =>
  <>
    <SEO title={`Posts(${tag})`}/>
    <PostsTemplate
      active={`tags / ${tag}`}
      posts={edges.map(convertPostPick)}
      tags={tags.map(
        ({ fieldValue: name, totalCount: count, edges }) =>
          ({ name, count, posts: edges.map(convertPostPick) }))
        .sort(postPickCountDescOrder)}
      dates={dates.map(
        ({ fieldValue: name, totalCount: count, edges }) =>
          ({ name, count, posts: edges.map(convertPostPick) }))
        .sort((a, b) => compareDesc(new Date(a.name), new Date(b.name)))}/>
  </>;

export default TagPosts;

export const query = graphql`query TagPosts($tag: String) {
  posts: allMarkdownRemark(filter: {frontmatter: {tags: {in: [$tag]}}}, sort: {order: DESC, fields: frontmatter___createdAt}) {
    edges {
      ...PostPick
    }
  }
  data: allMarkdownRemark {
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
