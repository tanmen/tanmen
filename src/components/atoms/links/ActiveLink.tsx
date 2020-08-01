import styled from "@emotion/styled";
import React, { FC } from "react";
import { Link as GatsbyLink } from "gatsby";

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
