import { keyframes } from "@emotion/core"
import styled from "@emotion/styled"
import React, { FC, useEffect, useState } from "react"
import { useTypeSentence } from "../../hooks/useTypeSentence"
import { Room } from "../room"

export const IndexTemplate: FC = () => {
  const { sentence, finished } = useTypeSentence([
    "Hi people :)",
    "Welcome to a certain lazy programmer's site."
  ])
  const viewed = Boolean(localStorage.getItem('INDEX_VIEWED'))
  const [scene, setScene] = useState<number>(viewed ? 1 : 0)

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        setScene(scene + 1)
      }, 1500)
      setTimeout(() => {
        localStorage.setItem('INDEX_VIEWED', 'true')
      }, 2000)
    }
  }, [finished, scene])

  return <Container>
    {
      scene === 0
        ? <TextBox finished={finished}>
          {sentence.map((text, index) => <Text key={index}>{text}</Text>)}
        </TextBox>
        : <Room animate={!viewed}/>
    }
  </Container>
}

const Container = styled.div({
  backgroundColor: "#282c34",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "white"
})

const TextBox = styled.div<{ finished: boolean }>(({ finished }) => ({
  textAlign: "center",
  animation: finished ? `${animation} 2s forwards` : "unset"
}))

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
`

const Text = styled.p`
margin: 0.2em;
font-size: 1.5em;
`
