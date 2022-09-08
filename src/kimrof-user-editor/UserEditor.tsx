import React, { ReactElement } from "react"
import { KimrofLabeledField } from "./kimrof"
import useKimrof from "./kimrof/useKimrof";
import useKimrofForm from "./kimrof/useKimrofForm"

export function UserEditor(): ReactElement {
  const formProps = useKimrofForm();
  const {
    values,
    metadata: { isDirty, isValid },
  } = useKimrof()

  return (
    <form className="person-editor" {...formProps}>
      <h2>Kimrof User Editor</h2>
      <KimrofLabeledField label="Firstname:" name="firstname" />
      <KimrofLabeledField label="Surname:" name="surname" />
      <KimrofLabeledField label="Email:" name="email" />
      <KimrofLabeledField label="Address:" name="address" />
      <KimrofLabeledField label="Phone:" name="phone" />
      <button className="btn btn-primary" disabled={!isDirty || !isValid}>
        Save
      </button>
      <hr />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </form>
  )
}
