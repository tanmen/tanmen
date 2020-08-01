import styled from "@emotion/styled";
import { Link as GatsbyLink } from "gatsby";
import React, { FC } from "react";

export const Link: FC<{ to: string, className?: string }> = ({ to, className, children }) =>
  <SLink to={to} className={className}>{children}</SLink>;

const SLink = styled(GatsbyLink)`
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
