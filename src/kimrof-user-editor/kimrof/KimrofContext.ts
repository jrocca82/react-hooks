import React, { createContext, Dispatch } from "react"
import { Metadata } from "./kimrofReducer"

import { KimrofErrors, KimrofObject, KimrofProperty } from "./Types"

interface ActionTypes {
  type: "set-property"
}

export interface KimrofContext {
  values: KimrofObject
  metadata: Metadata
  errors: KimrofErrors
  submitForm: () => void
  setFieldValue: (name: string, value: KimrofProperty) => void
}

export const kimrofContext = createContext<KimrofContext>({
  values: {},
  errors: {},
  metadata: { isDirty: false, isValid: true },
  submitForm: () => void null,
  setFieldValue: () => void null,
})
