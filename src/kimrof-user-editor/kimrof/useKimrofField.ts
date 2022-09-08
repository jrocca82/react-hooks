import React, { ChangeEvent, useCallback, useContext } from "react"
import { kimrofContext } from "./KimrofContext"

import { KimrofProperty } from "./Types"

const useKimrofField = (name: string) => {
  const { values, errors, setFieldValue } = useContext(kimrofContext)

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.name, e.target.value)
  }, [setFieldValue])

  return {
    value: values[name],
    error: errors[name],
    onChange,
  } as const
}

export default useKimrofField;
