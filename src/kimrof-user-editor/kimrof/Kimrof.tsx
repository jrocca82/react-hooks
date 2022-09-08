// Kimrof = Formik reversed :-)

import React, { ReactElement, ReactNode, useCallback, useMemo, useReducer } from "react"
import useThrottle from "../../person-editor/hooks/useThrottle"
import { KimrofContext, kimrofContext } from "./KimrofContext"
import kimrofReducer from "./kimrofReducer"

import { KimrofObject, KimrofProperty, KimrofErrors } from "./Types"

interface Props<TData> {
  children: ReactNode
  initialValues: TData
  onSubmit: (values: TData) => void
  validate?: (values: TData) => KimrofErrors
}

const Kimrof = <TData extends KimrofObject>({
  children,
  initialValues,
  onSubmit,
  validate
}: Props<TData>): ReactElement => {
  const [{ values, errors, metadata }, dispatch] = useReducer(kimrofReducer, {
    values: initialValues,
    errors: {},
    metadata: {
      isDirty: false,
      isValid: true,
    },
  })

  const validateValues = useCallback(() => {
    if(validate) {
      const errors = validate(values as TData)
      dispatch({type: "validation-result", payload: errors})
    }
  }, [validate, values])

  useThrottle(validateValues, 100)

  const context: KimrofContext = useMemo(
    () => ({
      values,
      errors,
      metadata,
      submitForm: () => onSubmit(values as TData),
      setFieldValue: (name: string, value: KimrofProperty) => {
        dispatch({ type: "set-property", payload: { name, value } })
      },
    }),
    [values, metadata, onSubmit]
  )

  return (
    <kimrofContext.Provider value={context}>{children}</kimrofContext.Provider>
  )
}

export default Kimrof
