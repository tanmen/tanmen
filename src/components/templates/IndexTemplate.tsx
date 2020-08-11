import styled from "@emotion/styled";
import { easeCubicInOut } from "d3-ease";
import React, { FC, useEffect, useMemo, useState } from "react";
import { animated, useTransition } from "react-spring";
import { useOnlyFirst } from "../../hooks/useOnlyFirst";
import { Backboard } from "../atoms";
import { Room } from "../organisms/room";
import { TypeScene } from "../organisms/TypeScene";

export const IndexTemplate: FC = () => {
  const { visit, visited } = useOnlyFirst("INDEX_VIEWED");
  const [scene, setScene] = useState<number>(visited ? 1 : 0);
  const [handler, setHandler] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {handler && clearTimeout(handler);};
  }, [handler]);

  const transitions = useTransition(scene, null, {
    initial: { transform: "translateX(0vw)" },
    from: { transform: "translateX(150vw)" },
    enter: { transform: "translateX(0vw)" },
    leave: { transform: "translateX(-150vw)" },
    config: { duration: 1500, easing: easeCubicInOut }
  });

  const sentence = useMemo(() => [
    "Hi people :)",
    "Welcome to a certain lazy programmer's site X)"
  ], []);

  return <Backboard>
    {transitions.map(({ item, key, props }) =>
      item === 0 ?
        <AnimatedBox key={key} style={props}>
          <TypeScene sentence={sentence} onFinish={() => {
            const timeout = setTimeout(() => {
              visit();
              setScene(1);
            }, 500);
            setHandler(timeout);
          }}/>
        </AnimatedBox> :
        <AnimatedBox key={key} style={props}>
          <Room/>
        </AnimatedBox>)}
  </Backboard>;
};


const AnimatedBox = animated(styled.div`
position: fixed;
width: 100vw;
`);
