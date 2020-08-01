import { act, renderHook } from "@testing-library/react-hooks"
import { useType } from "../useType"

jest.useFakeTimers()

describe("useType", () => {
  it("should be type", () => {
    const delay = 100
    const { result } = renderHook(() => useType("test", false, delay))

    expect(result.current).toHaveProperty("text", "")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "t")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "te")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "tes")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "test")
    expect(result.current).toHaveProperty("finished", true)
  })

  it("should be wait to type", () => {
    const delay = 100
    const { result } = renderHook(() => useType("test", true, delay))

    expect(result.current).toHaveProperty("text", "")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "")
    act(() => {jest.advanceTimersByTime(delay)})
    act(() => {result.current.start()})
    expect(result.current).toHaveProperty("text", "")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "t")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "te")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "tes")
    act(() => {jest.advanceTimersByTime(delay)})
    expect(result.current).toHaveProperty("text", "test")
  })
})
