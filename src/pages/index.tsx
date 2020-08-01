import { graphql } from "gatsby";
import React, { FC } from "react";
import { IndexTemplate } from "../components/templates/IndexTemplate";
import SEO from "../metas/seo";

const RootPage: FC = () => <>
  <SEO/>
  <IndexTemplate/>
</>;

export default RootPage;

const query = graphql`query {
  file(relativePath: { eq: "blog/avatars/kyle-mathews.jpeg" }) {
    childImageSharp {
      fixed(width: 125, height: 125) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;

