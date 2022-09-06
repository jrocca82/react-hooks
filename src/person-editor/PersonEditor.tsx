import React, { ReactElement, useRef, useEffect } from "react";

import { LabeledInput, Loading } from "../components";
import { initialPerson } from "../utils";
import usePerson from "./hooks/usePerson";

export const PersonEditor = () => {
  const [person, setPerson] = usePerson(initialPerson);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      input.current?.focus();
    }, 5000)
  }, []);

  if (!person) {
    return <Loading />
  }

  return (
    <form
      className="person-editor"
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Submitting\n${JSON.stringify(person, null, 2)}`);
      }}
    >
      <h2>Person Editor</h2>
      <LabeledInput
        ref={input}
        label="Firstname:"
        value={person.firstname}
        onChange={(e) => {
          setPerson((person) => ({
            ...person!,
            firstname: e.target.value,
          }))
          if (e.target.value === "Ford") {
            setPerson((person) => ({
              ...person!,
              surname: "Prefect",
              address: "Outer Space",
              email: "",
              phone: "",
            }))
          }
        }}
      />
      <LabeledInput
        label="Surname:"
        value={person.surname}
        onChange={(e) => {
          const newPerson = { ...person, surname: e.target.value }
          setPerson(newPerson)
        }}
      />
      <LabeledInput
        label="Email:"
        value={person.email}
        onChange={(e) => {
          const newPerson = { ...person, email: e.target.value }
          setPerson(newPerson)
        }}
      />
      <LabeledInput
        label="Address:"
        value={person.address}
        onChange={(e) => {
          const newPerson = { ...person, address: e.target.value }
          setPerson(newPerson)
        }}
      />
      <LabeledInput
        label="Phone:"
        value={person.phone}
        onChange={(e) => {
          const newPerson = { ...person, phone: e.target.value }
          setPerson(newPerson)
        }}
      />
      <hr />
      <div className="btn-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <hr />
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </form>
  )
}
