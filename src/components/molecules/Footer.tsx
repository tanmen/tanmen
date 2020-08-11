import styled from "@emotion/styled";
import React, { FC } from "react";

export const Footer: FC = () =>
  <Box>
    © Tanmen
  </Box>;


export const FooterStyle = {
  height: "50px",
  marginTop: "1rem"
};

const Box = styled.footer`
display: flex;
justify-content: center;
box-sizing: border-box;
height: ${FooterStyle.height};
border-top: 1px solid #343a40;
padding: 1rem;
margin-top: ${FooterStyle.marginTop};
`;
