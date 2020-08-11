import { useEffect, useState } from "react"
import { useMount } from "react-use"
import { useType } from "./useType"

export const useTypeSentence = (sentence: string[], delay: number = 50) => {
  const types = sentence.map(text => useType(text, true, delay))
  const [count, setCount] = useState(0)

  useMount(() => {
    types[0]?.start();
  })
  const finishCount = types.filter(type => type.finished).length
  useEffect(() => {
    if (finishCount === 0) return
    const current = count + 1
    setCount(current)
    const handler = setTimeout(() => types[current]?.start(), 1000)
    return () => {
      clearTimeout(handler)
    }
  },[finishCount])

  return {
    sentence: types.map(({text}) => text).filter(text => text),
    finished: types.every(type => type.finished)
  }
}
