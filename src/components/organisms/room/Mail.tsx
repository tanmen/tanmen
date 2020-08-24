import { css, keyframes } from "@emotion/core";
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
        name="Contact"
        to="/contact"
        images={{
          normal,
          active
        }}
        alt="mail"
        direction="up"
        styles={styles}
        nameStyles={nameStyles}/>}
  />;
};

const anime = keyframes`
from {
  top: -45px;
  opacity: 0;
}

to {
  top: -35px;
  opacity: 1;
}
`;

const nameStyles = css`
position: absolute;
font-size: .8em;
top: -35px;
left: 30px;
color: #6d6d6d;
text-decoration: none;
transform: rotate(30deg) skewX(30deg);
animation: ${anime} 200ms;
`;

const styles = {
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
};

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
