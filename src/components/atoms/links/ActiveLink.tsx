import styled from "@emotion/styled";
import { Link as GatsbyLink } from "gatsby";
import React, { FC } from "react";

export const ActiveLink: FC<{ to: string, className?: string }> = ({ to, className, children }) =>
  <SLink to={to} className={className}>{children}</SLink>;

const SLink = styled(GatsbyLink)`
text-decoration: none;
&:link {
  color: #007bff;
  text-decoration: none;
}
&:visited {
  color: #007bff;
  text-decoration: none;
}
&:hover {
  color: whitesmoke;
  text-decoration: none;
}
`;
