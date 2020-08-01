import styled from "@emotion/styled";
import React, { FC } from "react";

export const NotFound: FC = () =>
  <Box>
    Oops! Not Found page X(
  </Box>

const Box = styled.div`
height: calc(100vh - 50px);
overflow: hidden;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
font-size: calc(10px + 5vmin);
`;
