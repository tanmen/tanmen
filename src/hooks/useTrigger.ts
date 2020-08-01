import { DependencyList, EffectCallback, useEffect } from "react"

export const useTrigger = (effect: EffectCallback, deps?: DependencyList) => {
  useEffect(() => {
    if (deps?.every(dep => dep)) {
      return effect()
    }
  }, deps)
}
