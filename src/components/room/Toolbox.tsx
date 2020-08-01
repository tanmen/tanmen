import ToolboxActive from "./assets/toolbox_active.png"
import ToolboxNormal from "./assets/toolbox_normal.png"
import { css } from "@emotion/core"
import React, { FC } from "react"
import { ImageLink } from "./ImageLink"

export const Toolbox: FC = () => <ImageLink
  to="/"
  images={{
    normal: ToolboxNormal,
    active: ToolboxActive
  }}
  alt="toolbox"
  styles={Style}/>

const Style = css`
position: absolute;
bottom: 675px;
right: 267px;
`
