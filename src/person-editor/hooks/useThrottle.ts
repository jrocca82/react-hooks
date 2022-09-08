import { useDebugValue, useEffect, useRef } from "react"

const useThrottle = (fn: () => void, timeout: number): void => {
  const prevRef = useRef<(() => void) | null>(null)
  const currentRef = useRef<(() => void) | null>(fn)

  if (prevRef.current !== fn) {
    currentRef.current = fn
  }

  useDebugValue(currentRef.current, (fn) => fn?.toString());

  useEffect(() => {
    const handle = setInterval(() => {
      if (currentRef.current) {
        currentRef.current()
        prevRef.current = currentRef.current
        currentRef.current = null
      }
    }, timeout)

    return () => clearInterval(handle)
  }, [timeout])
}

export default useThrottle
