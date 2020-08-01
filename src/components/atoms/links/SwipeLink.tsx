import styled from "@emotion/styled";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import React, { FC } from "react";

export const SwipeLink: FC<{ to: string, direction: "left" | "right" | "up" | "down", className?: string }> = ({ to, direction, className, children }) =>
  <SLink swipe direction={direction} to={to} className={className}>{children}</SLink>;

const SLink = styled(AniLink)`
text-decoration: none;
&:link {
  color: whitesmoke;
  text-decoration: none;
}
&:visited {
  color: whitesmoke;
  text-decoration: none;
}
&:hover {
  color: whitesmoke;
  text-decoration: none;
}
`;
