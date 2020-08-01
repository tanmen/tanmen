import { css } from "@emotion/core";
import { graphql, StaticQuery } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { DeskImgQuery } from "../../../../types/gatsby-graphql";
import { ImageLink } from "../../atoms";

export const Desk: FC = () => {
  return <StaticQuery
    query={query}
    render={({
               normal: { childImageSharp: { fixed: normal } },
               active: { childImageSharp: { fixed: active } }
             }: DeepNonNullable<DeskImgQuery>) =>
      <ImageLink
        to="/profile"
        images={{
          normal,
          active
        }}
        alt="desk"
        styles={Style}
        direction="down"
      />}
  />;
};

const Style = css`
position: absolute;
bottom: 343px;
left: 236px;
z-index: 2;
`

const query = graphql`query DeskImg {
  normal: file(relativePath: {eq: "desk_normal.png"}) {
    childImageSharp {
      fixed (width: 311) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  active: file(relativePath: {eq: "desk_active.png"}) {
    childImageSharp {
      fixed (width: 311) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;

