import styled from "@emotion/styled";
import React, { FC } from "react";
import { useTransition } from "react-spring";
import { PostCard } from "./index";

export const PostCardList: FC<{ posts: PostPick[] }> = ({ posts }) => {
  const transitions = useTransition(posts, item => item.title, {
    from: { opacity: 0, transform: "translate3d(5px,40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,40px,0)" },
    trail: 200
  });
  return <Box>
    {transitions.map(({ item, key, props }) => <PostCard key={key} style={props} {...item}/>)}
  </Box>;
};

const Box = styled.div`
width: 100%;
min-width: 300px;
`;
