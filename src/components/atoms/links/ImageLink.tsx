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
  name?: string
  to: string
  images: {
    normal: FixedObject | FixedObject[]
    active: FixedObject | FixedObject[]
  }
  alt: string
  styles: ToggleStyles | SerializedStyles
  nameStyles?: SerializedStyles
  direction: "left" | "right" | "up" | "down"
}

export const ImageLink: FC<Props> = ({ name, to, images, alt, styles, nameStyles, direction }) => {
  const [active, setActive] = useState(false);

  return <SLink
    swipe
    direction={direction}
    to={to}
    styles={isToggleStyles(styles) ? active ? styles.active : styles.normal : styles}
    onMouseEnter={() => setActive(true)}
    onMouseLeave={() => setActive(false)}>
    {active ? <Name styles={nameStyles}>{name}</Name> : null}
    <GatsbyImage
      style={active ? ({ display: "block" }) : ({ display: "none" })}
      fixed={images.active}
      alt={alt}/>
    <GatsbyImage
      style={active ? ({ display: "none" }) : ({ display: "block" })}
      fixed={images.normal}
      alt={alt}/>
  </SLink>;
};

const isToggleStyles = (style: ToggleStyles | SerializedStyles): style is ToggleStyles =>
  style.hasOwnProperty("normal") && style.hasOwnProperty("active");

const SLink = styled(AniLink)<{ styles: SerializedStyles }>
(({ styles }) => styles);

const Name = styled.p<{ styles?: SerializedStyles }>
(({ styles }) => styles);
