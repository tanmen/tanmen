import { css } from "@emotion/core"
import React, { FC } from "react"
import BookshelfActiveImg from "./assets/bookshelf_active.png"
import BookshelfNormalImg from "./assets/bookshelf_normal.png"
import { ImageLink } from "./ImageLink"

export const Bookshelf: FC = () => <ImageLink
  to="/posts"
  images={{
    normal: BookshelfNormalImg,
    active: BookshelfActiveImg
  }}
  alt="bookshelf"
  styles={Style}/>

const Style = css`
position: absolute;
top: 145px;
left: 33px;
`
