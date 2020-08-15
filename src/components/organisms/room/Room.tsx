import styled from "@emotion/styled";
import { graphql, StaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import React, { FC } from "react";
import { DeepNonNullable } from "utility-types";
import { RoomImgQuery } from "../../../../types/gatsby-graphql";
import { Stretch } from "../../atoms/Stretch";
import { Bookshelf } from "./Bookshelf";
import { Desk } from "./Desk";
import { Mail } from "./Mail";
import { Server } from "./Server";
import { Toolbox } from "./Toolbox";

export const Room: FC = () =>
  <StyledStretch>
    <Box>
      <Desk/>
      <Bookshelf/>
      <Mail/>
      <Server/>
      <Toolbox/>
      <StaticQuery
        query={query}
        render={({ file: { childImageSharp: { fixed } } }: DeepNonNullable<RoomImgQuery>) => <RoomImg fixed={fixed}/>}
      />
    </Box>
  </StyledStretch>;

const query = graphql`query RoomImg {
  file(relativePath: {eq: "room.png"}) {
    childImageSharp {
      fixed (width: 894) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;

const StyledStretch = styled(Stretch)`
align-items: flex-start;
`;

const Box = styled.div`
position: relative;
`;

const RoomImg = styled(GatsbyImage)`
z-index: 1;
`;
