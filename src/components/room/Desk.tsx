import DeskActiveImg from "./assets/desk_active.png"
import DeskNormalImg from "./assets/desk_normal.png"
import { css } from "@emotion/core"
import React, { FC } from "react"
import { ImageLink } from "./ImageLink"

export const Desk: FC = () => <ImageLink
  to="/"
  images={{
    normal: DeskNormalImg,
    active: DeskActiveImg
  }}
  alt="desk"
  styles={Style}/>

const Style = css`
position: absolute;
bottom: 343px;
left: 236px;
`
