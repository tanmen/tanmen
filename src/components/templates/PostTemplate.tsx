import styled from "@emotion/styled";
import { format } from "date-fns";
import React, { FC, useMemo } from "react";
import { DateCountList, Jumbotron, Layout, Side, TagCountList } from "../molecules";
import { Breadcrumb } from "../molecules/Breadcrumb";

type Props = Post & {
  side: {
    tags: PostCount[]
    dates: PostCount[]
  }
}

export const PostTemplate: FC<Props> = ({ title, createdAt, updatedAt, tags, html, side }) => {
  const items = useMemo(() => title ? [{ name: "Top", path: "/posts" }, { name: title, path: `/posts/${title}` }]
    : [{ name: "Top", path: "/posts" }], [title]);
  return <Layout direction="left">
    <Jumbotron/>
    <Centering>
      <Breadcrumb items={items}/>
      <Content>
        <PostBox>
          <Header>
            <Title>{title}</Title>
            <Property>
              <Tags>{tags.map(name => <Tag key={name}>{name}</Tag>)}</Tags>
              <Times>
                <DateAt>作成日: {format(createdAt, "yyyy/MM/dd")}</DateAt>
                <DateAt>更新日: {format(updatedAt, "yyyy/MM/dd")}</DateAt>
              </Times>
            </Property>
          </Header>
          <Post className="markdown-body" dangerouslySetInnerHTML={{ __html: html }}/>
        </PostBox>
        <Side>
          <TagCountList tags={side.tags}/>
          <DateCountList dates={side.dates}/>
        </Side>
      </Content>
    </Centering>
  </Layout>;
};

const Header = styled.header`
margin: .67em 0 16px;
padding-bottom: .3em;
border-bottom: 1px solid #343a40;
`;

const Title = styled.h1`
font-size: 2em;
font-weight: 600;
line-height: 1.25;
`;

const Centering = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Content = styled.div`
display: flex;
width: 1000px;
justify-content: space-between;
`;

const PostBox = styled.div`
display: flex;
flex-direction: column;
width: 1000px;
`;

const Post = styled.div`
width: 100%;
`;

const Property = styled.div`
display: flex;
justify-content: space-between;
`;

const Tags = styled.div`
margin: 1rem 0 .75rem;
`;

const Tag = styled.span`
border-radius: .25rem;
background-color: #4f5558;
padding: .25rem;
& + & {
  margin-left: .5rem;
}
`;

const Times = styled.div`
display: flex;
align-items: center;
`;

const DateAt = styled.span`
& + & {
  margin-left: .5em;
}
`;
