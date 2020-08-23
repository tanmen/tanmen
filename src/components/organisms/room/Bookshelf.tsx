import { css, keyframes } from "@emotion/core";
import { graphql, StaticQuery } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { BookshelfImgQuery } from "../../../../types/gatsby-graphql";
import { ImageLink } from "../../atoms";

export const Bookshelf: FC = () => {
  return <StaticQuery
    query={query}
    render={({
               normal: { childImageSharp: { fixed: normal } },
               active: { childImageSharp: { fixed: active } }
             }: DeepNonNullable<BookshelfImgQuery>) =>
      <ImageLink
        name="Blogs"
        to="/posts"
        images={{
          normal,
          active
        }}
        alt="blogs"
        direction="right"
        styles={Style}
        nameStyles={nameStyles}/>}
  />;
};

const anime = keyframes`
from {
  top: 46px;
  opacity: 0;
}

to {
  top: 56px;
  opacity: 1;
}
`;

const nameStyles = css`
z-index: 4;
position: absolute;
font-size: .8em;
top: 56px;
left: 100px;
color: #b3b3b3;
text-decoration: none;
transform: rotate(-30deg) skewX(-30deg);
animation: ${anime} 200ms;
`;

const Style = css`
position: absolute;
top: 145px;
left: 33px;
z-index: 3;
`;

const query = graphql`query BookshelfImg {
  normal: file(relativePath: {eq: "bookshelf_normal.png"}) {
    childImageSharp {
      fixed (width: 245) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  active: file(relativePath: {eq: "bookshelf_active.png"}) {
    childImageSharp {
      fixed (width: 287) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;
