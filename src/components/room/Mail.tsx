import MailActiveImg from "./assets/mail_active.png"
import MailNormalImg from "./assets/mail_normal.png"
import { css } from "@emotion/core"
import React, { FC } from "react"
import { ImageLink } from "./ImageLink"

export const Mail: FC = () => <ImageLink
  to="/"
  images={{
    normal: MailNormalImg,
    active: MailActiveImg
  }}
  alt="mail"
  styles={Style}/>

const Style = {
  normal: css`
    position: absolute;
    bottom: 596px;
    right: 104px;
  `,
  active: css`
    position: absolute;
    bottom: 596px;
    right: 91px;
  `
}
