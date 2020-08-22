"use strict";
const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Tanmen",
    description:
      "怠惰なプログラマーのサイト",
    author: "tanmen",
    social: {
      github: "tanmen",
      twitter: "dot_tanmen",
      qiita: "dot_tanmen"
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: path.join(__dirname, `src`, `pages`, `posts`)
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-code-titles`
          },
          {
            resolve: `gatsby-remark-plantuml`
          },
          {
            resolve: `gatsby-remark-prismjs`
          }
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `./types/gatsby-graphql.ts`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_TRACKING_ID
      }
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: process.env.GOOGLE_ADSENSE_ID
      }
    }
  ]
};
