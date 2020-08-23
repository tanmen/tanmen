import styled from "@emotion/styled";
import React, { FC, useMemo } from "react";
import { DateCountList, Jumbotron, Layout, PostCardList, Side, TagCountList } from "../molecules";
import { Breadcrumb } from "../molecules/Breadcrumb";

type Props = {
  posts: PostPick[]
  tags: PostCount[]
  dates: PostCount[]
  active?: string
}

export const PostsTemplate: FC<Props> = ({ active, posts, tags, dates }) => {
  const items = useMemo(() => active ? [{ name: "Top", path: "/posts" }, { name: active, path: `/posts/${active}` }]
    : [{ name: "Top", path: "/posts" }], [active]);
  return <Layout direction="left">
    <Jumbotron/>
    <Centering>
      <Breadcrumb items={items}/>
      <PostBox>
        <PostCardList posts={posts}/>
        <Side>
          <TagCountList tags={tags}/>
          <DateCountList dates={dates}/>
        </Side>
      </PostBox>
    </Centering>
  </Layout>;
};

const Centering = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const PostBox = styled.div`
display: flex;
width: 1000px;
justify-content: space-between;
`;
