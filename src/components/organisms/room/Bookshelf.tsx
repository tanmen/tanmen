import { css } from "@emotion/core";
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
        to="/posts"
        images={{
          normal,
          active
        }}
        alt="bookshelf"
        direction="right"
        styles={Style}/>}
  />;
};

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
