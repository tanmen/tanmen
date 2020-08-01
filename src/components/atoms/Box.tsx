import { FC } from "react";
import styled from "@emotion/styled";
import React from "react";

export const Box : FC = ({children}) =>
  <Style>
    {children}
  </Style>

const Style = styled.div`
background-color: #343a40;
border-radius: .25rem;
padding: 10px;
`;
