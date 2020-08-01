import React, { FC } from "react";
import styled from "@emotion/styled";

export const Side: FC = ({ children }) =>
  <Style>
    {children}
  </Style>;

const Style = styled.div`
min-width: 150px;
margin-left: 1rem;
& > * + * {
  margin-top: 1rem; 
}`;
