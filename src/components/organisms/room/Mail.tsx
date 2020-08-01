import { css } from "@emotion/core";
import { graphql, StaticQuery } from "gatsby";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { MailImgQuery } from "../../../../types/gatsby-graphql";
import { ImageLink } from "../../atoms";

export const Mail: FC = () => {
  return <StaticQuery
    query={query}
    render={({
               normal: { childImageSharp: { fixed: normal } },
               active: { childImageSharp: { fixed: active } }
             }: DeepNonNullable<MailImgQuery>) =>
      <ImageLink
        to="/contact"
        images={{
          normal,
          active
        }}
        alt="desk"
        direction="up"
        styles={Style}/>}
  />;
};

const Style = {
  normal: css`
    position: absolute;
    bottom: 596px;
    right: 104px;
    z-index: 2;
  `,
  active: css`
    position: absolute;
    bottom: 596px;
    right: 91px;
    z-index: 2;
  `
}

const query = graphql`query MailImg {
  normal: file(relativePath: {eq: "mail_normal.png"}) {
    childImageSharp {
      fixed (width: 58) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  active: file(relativePath: {eq: "mail_active.png"}) {
    childImageSharp {
      fixed (width: 93) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;
