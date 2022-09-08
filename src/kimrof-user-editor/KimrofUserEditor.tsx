import React, { ReactElement } from "react"
import { IndexedPerson } from "../types/IndexedPerson"
import { initialPerson } from "../utils"
import Kimrof from "./kimrof/Kimrof"

// Kimrof = Formik reversed :-)
import { UserEditor } from "./UserEditor"
import { validatePerson } from "./validatePerson"

export function KimrofUserEditor(): ReactElement {
  return (
    <Kimrof
      initialValues={initialPerson as IndexedPerson}
      onSubmit={(person) => alert(JSON.stringify(person, null, 2))}
      validate={validatePerson}
    >
      <UserEditor />
    </Kimrof>
  )
}
