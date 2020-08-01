import styled from "@emotion/styled";
import React, { FC } from "react";

export const Footer: FC = () =>
  <Box>
    © Tanmen
  </Box>;

export const height = '50px';
export const marginTop = '1rem';

const Box = styled.footer`
display: flex;
justify-content: center;
box-sizing: border-box;
height: ${height};
border-top: 1px solid #343a40;
padding: 1rem;
margin-top: ${marginTop};
`;
