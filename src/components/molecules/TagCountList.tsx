import styled from "@emotion/styled";
import React, { FC } from "react";
import { Box } from "../atoms";
import { TagCount } from "./index";

export const TagCountList: FC<{ tags: PostCount[] }> = ({ tags }) => <Box>
  <Title>Tags</Title>
  <div>{tags.map(tag => <TagCount key={tag.name} {...tag}/>)}</div>
</Box>;

const Title = styled.p`
margin-bottom: 15px;
`;
