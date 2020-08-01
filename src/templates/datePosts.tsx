import compareDesc from "date-fns/compareDesc";
import { graphql } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { DatePostsQuery, PostPickFragment } from "../../types/gatsby-graphql";
import { PostsTemplate } from "../components/templates/PostsTemplate";
import SEO from "../metas/seo";

const DatePosts: FC<{ data: DeepNonNullable<DatePostsQuery>, pageContext: { date: string } }> = ({ data: { posts: { edges }, data: { tags, dates } }, pageContext: { date } }) =>
  <>
    <SEO title={`Posts(${date})`}/>
    <PostsTemplate
      active={`dates / ${date}`}
      posts={edges.map(convertPostPick)}
      tags={tags.map(
        ({ fieldValue: name, totalCount: count, edges }) =>
          ({ name, count, posts: edges.map(convertPostPick) }))
        .sort(compare)}
      dates={dates.map(
        ({ fieldValue: name, totalCount: count, edges }) =>
          ({ name, count, posts: edges.map(convertPostPick) }))
        .sort((a, b) => compareDesc(new Date(a.name), new Date(b.name)))}/>
  </>;

export default DatePosts;

export const query = graphql`query DatePosts($date: Date) {
  posts: allMarkdownRemark(filter: {frontmatter: {createdMonthAt: {eq: $date}}}, sort: {order: DESC, fields: frontmatter___createdAt}) {
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

const convertPostPick = ({ node: { headings: [{ value }], excerpt, frontmatter: { createdAt, tags } } }: DeepNonNullable<PostPickFragment>) =>
  ({ title: value, createdAt: new Date(createdAt), excerpt, tags });

const compare = (a: PostCount, b: PostCount) => {
  if (a.count < b.count) {
    return 1;
  } else if (a.count > b.count) {
    return -1;
  }
  return 0;
};
