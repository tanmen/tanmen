import { AnimatedValue, ForwardedProps } from "react-spring/web";

export type DesignProps = {
  className?: string
}

export type AnimatedProps = {
  style?: AnimatedValue<ForwardedProps<object>>
}
