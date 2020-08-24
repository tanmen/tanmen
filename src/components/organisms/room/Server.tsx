import { css, keyframes } from "@emotion/core";
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
        name="Services"
        to="/services"
        images={{
          normal,
          active
        }}
        alt="services"
        direction="left"
        styles={style}
        nameStyles={nameStyles}/>}
  />;
};

const anime = keyframes`
from {
  top: 42px;
  opacity: 0;
}

to {
  top: 52px;
  opacity: 1;
}
`;

const nameStyles = css`
position: absolute;
font-size: .8em;
top: 52px;
left: 32px;
color: #6d6d6d;
text-decoration: none;
transform: rotate(30deg) skewX(30deg);
animation: ${anime} 200ms;
z-index: 3;
`;

const style = css`
position: absolute;
bottom: 222px;
right: 61px;
z-index: 2;
`;

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
