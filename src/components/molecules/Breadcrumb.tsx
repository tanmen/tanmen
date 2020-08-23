import styled from "@emotion/styled";
import React, { FC } from "react";
import { animated, useTransition } from "react-spring";
import { ActiveLink } from "../atoms/links";

type Link = {
  name: string
  path: string
}

type Props = {
  items: Link[]
}

export const Breadcrumb: FC<Props> = ({ items }) => {
  const transitions = useTransition(items, (item: Link) => item.path, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  return <Box>
    {transitions.map(({ item, key, props }, index) =>
      index + 1 < items.length
        ? <React.Fragment key={key}><Item><ActiveLink
          to={item.path}>{item.name}</ActiveLink></Item><span>/</span></React.Fragment>
        : items.length === 1
        ? <Item key={key}>{item.name}</Item>
        : <Item key={key} style={props}>{item.name}</Item>)}
  </Box>;
};


const Box = styled.ol`
display: flex;
width: 970px;
flex-wrap: wrap;
padding: .75rem 1rem;
margin-bottom: 1rem;
list-style: none;
color: #6c757d;
background-color: #343a40;
border-radius: .25rem;
`;

const Item = animated(styled.li`
display: list-item;
text-align: -webkit-match-parent;
& + * {
  margin-left: 5px;
}
* + & {
  margin-left: 5px;
}
`);
