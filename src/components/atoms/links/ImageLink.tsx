import { SerializedStyles } from "@emotion/core";
import styled from "@emotion/styled";
import GatsbyImage, { FixedObject } from "gatsby-image";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import React, { FC, useState } from "react";

type ToggleStyles = {
  normal: SerializedStyles
  active: SerializedStyles
}

interface Props {
  to: string
  images: {
    normal: FixedObject | FixedObject[]
    active: FixedObject | FixedObject[]
  }
  alt: string
  styles: ToggleStyles | SerializedStyles
  direction: "left" | "right" | "up" | "down"
}

export const ImageLink: FC<Props> = ({ to, images, alt, styles, direction }) => {
  const [active, setActive] = useState(false);

  return <SLink
    swipe
    direction={direction}
    to={to}
    styles={isToggleStyles(styles) ? active ? styles.active : styles.normal : styles}
    onMouseEnter={() => setActive(true)}
    onMouseLeave={() => setActive(false)}>
    <GatsbyImage
      fixed={active ? images.active : images.normal}
      alt={alt}/>
  </SLink>;
};

const isToggleStyles = (style: ToggleStyles | SerializedStyles): style is ToggleStyles =>
  style.hasOwnProperty("normal") && style.hasOwnProperty("active");

const SLink = styled(AniLink)<{ styles: SerializedStyles }>
(({ styles }) => styles);
