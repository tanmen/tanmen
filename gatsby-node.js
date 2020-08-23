'use strict'

exports.createPages = async ({ graphql, actions }) => {
  await postsCreate(graphql, actions);
  await postCreate(graphql, actions);
};

const postsCreate = async (graphql, actions) => {
  const { data } = await graphql(`
    query TagList {
      allMarkdownRemark {
        tags: group(field: frontmatter___tags) {
          fieldValue
        }
        dates: group(field: frontmatter___createdMonthAt) {
          fieldValue
        }
      }
    }
  `);
  data.allMarkdownRemark.tags.forEach(({ fieldValue }) =>
    fieldValue && actions.createPage({
      path: `posts/tags/${fieldValue}`,
      component: require.resolve(`./src/templates/tagPosts.tsx`),
      context: { tag: fieldValue }
    }));
  data.allMarkdownRemark.dates.forEach(({ fieldValue }) =>
    fieldValue && actions.createPage({
      path: `posts/dates/${fieldValue}`,
      component: require.resolve(`./src/templates/datePosts.tsx`),
      context: { date: fieldValue }
    }));
};

const postCreate = async (graphql, actions) => {
  const { data } = await graphql(`
    query PostList {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }`);
  data.allMarkdownRemark.edges.forEach(({node: {frontmatter: {title}}}) => {
    actions.createPage({
      path: `posts/${title}`,
      component: require.resolve(`./src/templates/post.tsx`),
      context: { title }
    })
  })
};
