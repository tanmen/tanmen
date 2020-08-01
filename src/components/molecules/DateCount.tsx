import styled from "@emotion/styled";
import React, { FC } from "react";
import { UnderLink } from "../atoms/links";

export const DateCount: FC<PostCount & { className?: string }> = ({ className, count, name }) =>
  <Date className={className}><UnderLink to={`/posts/dates/${encodeURI(name)}`}>{name} ({count})</UnderLink></Date>;


const Date = styled.div<{ className?: string }>`
word-break: keep-all;
white-space: nowrap;
& + & {
  margin-top: 8px;
}
`;
