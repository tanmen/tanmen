import styled from "@emotion/styled";
import { format } from "date-fns";
import React, { FC } from "react";
import { animated } from "react-spring";
import { AnimatedValue, ForwardedProps } from "react-spring/web";
import { Link } from "../atoms/links";

export const PostCard: FC<PostPick & { style?: AnimatedValue<ForwardedProps<object>> }> = ({ title, createdAt, excerpt, tags, style }) =>
  <Box style={style}>
    <Card to={encodeURI(`/posts/${title}`)}>
      <Header>
        <Title>{title}</Title>
        <CreateDate>{format(createdAt, "yyyy/MM/dd")}</CreateDate>
      </Header>
      <Tags>{tags.map(name => <Tag key={name}>{name}</Tag>)}</Tags>
      <Preview>{excerpt}</Preview>
    </Card>
  </Box>;

const Box = animated(styled.div`
& + & {
  margin-top: 1rem;
}
`);

const Card = styled(Link)`
display: block;
border-radius: .25rem;
padding: .75rem 1rem;
background-color: #343a40;
`;

const Header = styled.header`
display: flex;
justify-content: space-between;
`;

const Title = styled.h2`
font-size: 2em;
`;

const CreateDate = styled.p`
font-size: 0.8em;
`;

const Tags = styled.div`
margin: .75rem 0 1rem;
`;

const Tag = styled.span`
border-radius: .25rem;
background-color: #4f5558;
padding: .25rem;
& + & {
  margin-left: .5rem;
}
`;

const Preview = styled.div`
border-top: 1px solid #282d34;
padding: 1rem .5rem .5rem;
`
