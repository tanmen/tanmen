import styled from "@emotion/styled";
import React, { FC } from "react";

export const Backboard: FC<{ className?: string }> = ({ children, className }) =>
  <Style className={className}>
    {children}
  </Style>;

const Style = styled.main`
background-color: #282c34;
color: white;
min-height: 100vh;
`;
