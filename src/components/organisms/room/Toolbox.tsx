import { css, keyframes } from "@emotion/core";
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
        name="Tools"
        to="/tools"
        images={{
          normal,
          active
        }}
        alt="tools"
        direction="down"
        styles={style}
        nameStyles={nameStyles}/>}
  />;
};

const anime = keyframes`
from {
  top: -25px;
  opacity: 0;
}

to {
  top: -15px;
  opacity: 1;
}
`;

const nameStyles = css`
position: absolute;
width: inherit;
font-size: .8em;
top: -15px;
left: 80px;
color: #b3b3b3;
text-decoration: none;
transform: rotate(30deg) skewX(30deg);
animation: ${anime} 200ms;
`;

const style = css`
position: absolute;
bottom: 675px;
right: 267px;
z-index: 2;
`;

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
