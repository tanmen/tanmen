import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import { graphql, StaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { RoomImgQuery } from "../../../../types/gatsby-graphql";
import { Bookshelf } from "./Bookshelf";
import { Desk } from "./Desk";
import { Mail } from "./Mail";
import { Server } from "./Server";
import { Toolbox } from "./Toolbox";

export const Room: FC<{ animate: boolean }> = ({ animate }) =>
  <Box animate={animate}>
    <Desk/>
    <Bookshelf/>
    <Mail/>
    <Server/>
    <Toolbox/>
    <StaticQuery
      query={query}
      render={({ file: { childImageSharp: { fixed } } }: DeepNonNullable<RoomImgQuery>) => <RoomImg fixed={fixed}/>}
    />
  </Box>;

const query = graphql`query RoomImg {
  file(relativePath: {eq: "room.png"}) {
    childImageSharp {
      fixed (width: 894) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;

const animation = keyframes`
0% {
  transform: translateX(100vw);
}

100% {
 transform: translateX(0);
}
`;

const Box = styled.div<{ animate: boolean }>(({ animate }) =>
  ({
    position: "relative",
    animation: animate ? `${animation} 1s forwards` : "unset"
  }));

const RoomImg = styled(GatsbyImage)`
position: absolute;
z-index: 1;
`;
