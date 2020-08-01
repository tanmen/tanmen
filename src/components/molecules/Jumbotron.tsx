import styled from "@emotion/styled";
import { graphql, StaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { JumbotronImgQuery } from "../../../types/gatsby-graphql";

export const Jumbotron: FC = () =>
  <StaticQuery
    query={query}
    render={({ file: { childImageSharp: { fluid } } }: DeepNonNullable<JumbotronImgQuery>) =>
      <Style fluid={fluid}>
        怠惰なエンジニアブログ
      </Style>}/>;

const query = graphql`query JumbotronImg {
  file(relativePath: {eq: "jumbotron.jpg"}) {
    childImageSharp {
      fluid (maxWidth: 1920, maxHeight: 300) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
}`;

const Style = styled(BackgroundImage)`
width: 100%;
height: 300px;
margin-bottom: 1rem;
display: flex;
justify-content: center;
align-items: center;
font-size: 2.5em;
`;
