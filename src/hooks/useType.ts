import { useEffect, useState } from "react"
import { useInterval, useMount } from "react-use"



export const useType = (text: string, wait: boolean = false,
                        delay: number = 50): { text: string, finished: boolean, start: () => void } => {
  const [count, setCount] = useState(0)
  const [_wait, setWait] = useState(wait)
  const finished = count >= text.length

  useEffect(() => {setWait(wait)}, [wait])
  useInterval(() => {
    !_wait && !finished && setCount(count + 1)
  }, delay)

  return {
    text: text.split("").slice(0, count).join(""),
    finished,
    start: () => setWait(false)
  }
}
