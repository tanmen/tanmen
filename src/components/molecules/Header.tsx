import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { HeaderQuery } from "../../../types/gatsby-graphql";
import { SwipeLink } from "../atoms/links";

export type HeaderProps = { direction: "left" | "right" | "up" | "down" };
export const Header: FC<HeaderProps> = ({ direction }) => {
  const { file: { childImageSharp: { fixed } } } = useStaticQuery<DeepNonNullable<HeaderQuery>>(graphql`query Header {
    file(relativePath: {eq: "logo.png"}) {
      childImageSharp {
        fixed (width: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }`);
  return <Box>
    <Logo direction={direction} to="/">
      <Title>
        <GatsbyImage
          fixed={fixed}
        />
        <Name>Tanmen</Name>
      </Title>
    </Logo>
  </Box>;
};

export const HeaderStyle = {
  height: "50px"
};

const Box = styled.header`
display: flex;
align-items: center;
box-sizing: border-box;
height: ${HeaderStyle.height};
padding: 5px 10px;
box-shadow: 0 5px 10px rgba(0,0,0,0.2);
`;

const Title = styled.h1`
display: flex;
align-items: center;
`;

const Name = styled.p`
margin-top: .15rem;
margin-left: .5rem;
font-size: 1.1rem;
`;

const Logo = styled(SwipeLink)`
display: flex;
align-items: center;
height: 100%;
`;
