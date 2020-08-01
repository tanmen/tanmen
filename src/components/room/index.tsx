import { keyframes } from "@emotion/core"
import styled from "@emotion/styled"
import React, { FC } from "react"
import { Bookshelf } from "./Bookshelf"
import { Desk } from "./Desk"
import { Mail } from "./Mail"
import { Server } from "./Server"
import { Toolbox } from "./Toolbox"
import RoomImg from "./assets/room.png"


export const Room: FC<{animate: boolean}> = ({animate}) =>
  <Box animate={animate}>
    <Desk/>
    <Bookshelf/>
    <Mail/>
    <Server/>
    <Toolbox/>
    <img src={RoomImg} alt="room"/>
  </Box>

const animation = keyframes`
0% {
  transform: translateX(100vw);
}

100% {
 transform: translateX(0);
}
`

const Box = styled.div<{animate: boolean}>(({animate}) =>
  ({
      position: 'relative',
      animation: animate ? `${animation} 1s forwards` : 'unset'
  }))
