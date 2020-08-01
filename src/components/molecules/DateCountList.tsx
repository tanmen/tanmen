import styled from "@emotion/styled";
import React, { FC } from "react";
import { Box } from "../atoms";
import { DateCount } from "./DateCount";

export const DateCountList: FC<{ dates: PostCount[] }> = ({ dates }) =>
  <Box>
    <Title>Dates</Title>
    {dates.map(date => <DateCount key={date.name} {...date}/>)}
  </Box>;

const Title = styled.p`
margin-bottom: 15px;
`;


