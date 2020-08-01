import styled from "@emotion/styled";
import React, { FC } from "react";
import { UnderLink } from "../atoms/links";

export const TagCount: FC<PostCount & { className?: string }> = ({ name, count, className }) =>
  <Tag className={className}>
    <Link
      to={encodeURI(`/posts/tags/${name}`)}>
      <Name>{name}</Name>
      <Count>({count})</Count>
    </Link>
  </Tag>;

const Tag = styled.div<{ className?: string }>`
& + & {
  margin-top: 8px;
}
`;

const Link = styled(UnderLink)`
display: flex;
`;

const Name = styled.p`
overflow: hidden;
word-break: keep-all;
white-space: nowrap;
text-overflow: ellipsis;
`;

const Count = styled.p`
margin-left: .25rem;
`;
