import styled from "@emotion/styled";
import React, { FC } from "react";
import { DesignProps } from "../../../types/props";
import { Backboard } from "../atoms";
import { Footer, FooterStyle } from "./Footer";
import { Header, HeaderProps, HeaderStyle } from "./Header";

export const Layout: FC<HeaderProps & DesignProps> =
  ({ direction, children, className }) =>
    <Backboard className={className}>
      <Header direction={direction}/>
      <StyledContent>
        {children}
      </StyledContent>
      <Footer/>
    </Backboard>;

export const StyledContent = styled.div`
min-height: calc(100vh - ${HeaderStyle.height} - ${FooterStyle.height} - ${FooterStyle.marginTop});
`;
