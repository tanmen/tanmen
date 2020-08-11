import styled from "@emotion/styled";
import * as React from "react";
import { FC } from "react";
import { DesignProps } from "../../../types/props";
import { Stretch } from "./Stretch";

export const Center: FC<DesignProps> = ({ className, children }) =>
  <Style className={className}>{children}</Style>;

const Style = styled(Stretch)`
align-items: center;
flex-direction: column;
`;
