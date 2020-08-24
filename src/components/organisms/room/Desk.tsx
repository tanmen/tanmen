import { css, keyframes } from "@emotion/core";
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
        name="Profile"
        to="/profile"
        images={{ normal, active }}
        alt="desk"
        styles={styles}
        nameStyles={nameStyles}
        direction="down"
      />}
  />;
};

const anime = keyframes`
from {
  top: -10px;
  opacity: 0;
}

to {
  top: 0;
  opacity: 1;
}
`;

const nameStyles = css`
position: absolute;
font-size: .8em;
left: 70px;
color: #6d6d6d;
text-decoration: none;
transform: rotate(-30deg) skewX(-30deg);
animation: ${anime} 200ms;
`;

const styles = css`
position: absolute;
bottom: 343px;
left: 236px;
z-index: 2;
`;

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

