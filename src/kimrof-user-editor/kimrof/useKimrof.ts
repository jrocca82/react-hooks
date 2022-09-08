import React, { useContext } from "react"
import { kimrofContext } from "./KimrofContext"

import { KimrofObject } from "./Types"

const useKimrof = () => {
  const { values, metadata } = useContext(kimrofContext)

  return { values, metadata } as const
}

export default useKimrof;