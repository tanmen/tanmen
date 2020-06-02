/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const postTemplate = require.resolve(`./src/templates/postTemplate.tsx`)
  const result = await graphql(`
    {
      allFile(filter: {sourceInstanceName: {eq: "posts"}}) {
        edges {
          node {
            name
            relativePath
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: `/posts/${node.name}`,
      component: postTemplate,
      context: {
        // additional data can be passed via context
        relativePath: node.relativePath,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type SiteSiteMetadata {
      author: String!
      description: String!
      title: String!
    }
  `
  createTypes(typeDefs)
}
