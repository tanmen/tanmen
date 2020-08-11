import styled from "@emotion/styled";
import React, { FC } from "react";
import { DesignProps } from "../../../types/props";
import { StyledContent } from "../molecules";
import {HeaderStyle, FooterStyle} from '../molecules'

export const Stretch: FC<DesignProps> = ({ className, children }) =>
  <Style className={className}>
    {children}
  </Style>;

const Style = styled.div`
height: 100vh;
overflow: hidden;
display: flex;
justify-content: center;
font-size: calc(10px + 2vmin);
${StyledContent} > & {
  height: calc(100vh - ${HeaderStyle.height} - ${FooterStyle.height} - ${FooterStyle.marginTop});
}
`;
