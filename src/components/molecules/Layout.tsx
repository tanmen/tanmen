import styled from "@emotion/styled";
import React, { FC } from "react";
import { Backboard } from "../atoms";
import { Footer, height as FHeight, marginTop } from "./Footer";
import { Header, Props, height as HHeight } from "./Header";

export const Layout: FC<Props & { className?: string }> =
  ({ direction, children, className }) =>
    <Backboard className={className}>
      <Header direction={direction}/>
      <Content>
        {children}
      </Content>
      <Footer/>
    </Backboard>;

const Content = styled.div`
min-height: calc(100vh - ${HHeight} - ${FHeight} - ${marginTop});
`;
