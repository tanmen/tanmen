import ServerActive from "./assets/server_active.png"
import ServerNormal from "./assets/server_normal.png"
import { css } from "@emotion/core"
import React, { FC } from "react"
import { ImageLink } from "./ImageLink"

export const Server: FC = () => <ImageLink
  to="/"
  images={{
    normal: ServerNormal,
    active: ServerActive
  }}
  alt="server"
  styles={Style}/>

const Style = css`
position: absolute;
bottom: 222px;
right: 61px;
`
