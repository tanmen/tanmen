import { css } from "@emotion/core";
import { graphql, StaticQuery } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { ServerImgQuery } from "../../../../types/gatsby-graphql";
import { ImageLink } from "../../atoms";

export const Server: FC = () => {
  return <StaticQuery
    query={query}
    render={({
               normal: { childImageSharp: { fixed: normal } },
               active: { childImageSharp: { fixed: active } }
             }: DeepNonNullable<ServerImgQuery>) =>
      <ImageLink
        to="/services"
        images={{
          normal,
          active
        }}
        alt="desk"
        direction="left"
        styles={Style}/>}
  />;
};

const Style = css`
position: absolute;
bottom: 222px;
right: 61px;
z-index: 2;
`

const query = graphql`query ServerImg {
  normal: file(relativePath: {eq: "server_normal.png"}) {
    childImageSharp {
      fixed (width: 221) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  active: file(relativePath: {eq: "server_active.png"}) {
    childImageSharp {
      fixed (width: 221) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;
