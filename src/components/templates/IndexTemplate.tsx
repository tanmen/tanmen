import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import React, { FC, useEffect, useState } from "react";
import { useTypeSentence } from "../../hooks/useTypeSentence";
import { Backboard } from "../atoms";
import { Room } from "../organisms";

export const IndexTemplate: FC = () => {
  const { sentence, finished } = useTypeSentence([
    "Hi people :)",
    "Welcome to a certain lazy programmer's site X)"
  ]);
  const viewed = Boolean(localStorage.getItem("INDEX_VIEWED"));
  const [scene, setScene] = useState<number>(viewed ? 1 : 0);

  useEffect(() => {
    if (scene === 0 && finished) {
      const sceneHandler = setTimeout(() => {
        setScene(scene + 1);
      }, 1500);
      const viewedHandler = setTimeout(() => {
        localStorage.setItem("INDEX_VIEWED", "true");
      }, 1500);
      return () => {
        clearTimeout(sceneHandler);
        clearTimeout(viewedHandler);
      };
    }
    return () => {};
  }, [finished, scene]);

  return <Backboard>
    <Container center={scene === 0}>
      {
        scene === 0
          ? <TextBox finished={finished}>
            {sentence.map((text, index) => <Text key={index}>{text}</Text>)}
          </TextBox>
          : <Room animate={!viewed}/>
      }
    </Container>
  </Backboard>;
};

const Container = styled.div<{ center: boolean }>(({ center }) => ({
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: center ? "center" : "start",
  fontSize: "calc(10px + 2vmin)"
}));

const TextBox = styled.div<{ finished: boolean }>(({ finished }) => ({
  textAlign: "center",
  animation: finished ? `${animation} 2s forwards` : "unset"
}));

const animation = keyframes`
0% {
  transform: translateX(0);
}

30% {
  transform: translateX(0);
}

100% {
 transform: translateX(-100vw);
}
`;

const Text = styled.p`
margin: 0.2em;
font-size: 1.5em;
`;
