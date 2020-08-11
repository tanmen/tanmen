import styled from "@emotion/styled";
import React, { FC, useEffect } from "react";
import { DesignProps } from "../../../types/props";
import { useTypeSentence } from "../../hooks/useTypeSentence";
import { Center } from "../atoms/Center";

type Props = {
  sentence: string[];
  onFinish: () => unknown;
} & DesignProps;
export const TypeScene: FC<Props> = ({ sentence, onFinish, className }) => {
  const { sentence: _sentence, finished } = useTypeSentence(sentence);

  useEffect(() => {
    if (finished) onFinish();
  }, [finished]);

  return <Center className={className}>
    {_sentence.map((text, index) => <Text key={index}>{text}</Text>)}
  </Center>;
};

const Text = styled.p`
margin: .2rem;
font-size: 1.5em;
`;
