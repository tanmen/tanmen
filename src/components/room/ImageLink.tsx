import { SerializedStyles } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import React, { FC, useState } from "react"

type ToggleStyles = {
  normal: SerializedStyles
  active: SerializedStyles
}

interface Props {
  to: string
  images: {
    normal: string
    active: string
  }
  alt: string
  styles: ToggleStyles | SerializedStyles
}

export const ImageLink: FC<Props> = ({ to, images, alt, styles }) => {
  const [active, setActive] = useState(false)

  return <Link
    to={to}
    onMouseEnter={() => setActive(true)}
    onMouseLeave={() => setActive(false)}>
    <Image
      src={active ? images.active : images.normal}
      alt={alt}
      serializedStyles={isToggleStyles(styles) ? active ? styles.active : styles.normal : styles}/>
  </Link>
}

const isToggleStyles = (style: ToggleStyles | SerializedStyles): style is ToggleStyles =>
  style.hasOwnProperty('normal') && style.hasOwnProperty('active')

const Image = styled.img<{ serializedStyles: SerializedStyles }>
(({ serializedStyles }) => serializedStyles)
