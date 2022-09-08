import { useEffect, useRef } from "react"

const useWillUnmount = (fn: () => void): void => {
  const functionRef = useRef(fn)

  functionRef.current = fn

  useEffect(() => {
    return () => functionRef.current()
  }, [])
}

export default useWillUnmount
