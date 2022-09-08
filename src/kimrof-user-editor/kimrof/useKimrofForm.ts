import React, { useCallback, useContext } from "react"
import { kimrofContext } from "./KimrofContext"

const useKimrofForm = () => {
  const { submitForm } = useContext(kimrofContext)

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
        e.preventDefault()
        submitForm()
    },
    [submitForm]
  )

  return {
    onSubmit
  } as const
}

export default useKimrofForm