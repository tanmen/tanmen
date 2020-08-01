import { css } from "@emotion/core";
import { graphql, StaticQuery } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { ToolboxImgQuery } from "../../../../types/gatsby-graphql";
import { ImageLink } from "../../atoms";

export const Toolbox: FC = () => {
  return <StaticQuery
    query={query}
    render={({
               normal: { childImageSharp: { fixed: normal } },
               active: { childImageSharp: { fixed: active } }
             }: DeepNonNullable<ToolboxImgQuery>) =>
      <ImageLink
        to="/tools"
        images={{
          normal,
          active
        }}
        alt="desk"
        direction="down"
        styles={Style}/>}
  />;
};

const Style = css`
position: absolute;
bottom: 675px;
right: 267px;
z-index: 2;
`

const query = graphql`query ToolboxImg {
  normal: file(relativePath: {eq: "toolbox_normal.png"}) {
    childImageSharp {
      fixed (width: 179) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  active: file(relativePath: {eq: "toolbox_active.png"}) {
    childImageSharp {
      fixed (width: 179) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;
