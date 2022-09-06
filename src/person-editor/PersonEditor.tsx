import React, { ReactElement, useState, useEffect } from "react";
import localforage from "localforage";
import type { Person } from "../types/person";

import { LabeledInput, Loading } from "../components"
import { initialPerson } from "../utils"

export function PersonEditor(): ReactElement {
  const [person, setPerson] = useState<Person | null>(null);

 const savePerson = (person: Person | null) => {
    console.log("saving", person);
    localforage.setItem("person", person);
  }

  useEffect(() => {
    const getPerson = async() => {
      const person = await localforage.getItem<Person>("person");
      setPerson(person ?? initialPerson)
    };

    getPerson();
  }, []);

  useEffect(() => {
    savePerson(person)
  }, [person]);

  if (!person) {
    return <Loading/>
  }

  return (
    <form
      className="person-editor"
      onSubmit={(e) => {
        e.preventDefault()
        alert(`Submitting\n${JSON.stringify(person, null, 2)}`)
      }}
    >
      <h2>Person Editor</h2>
      <LabeledInput
        label="Firstname:"
        value={person.firstname}
        onChange={(e) => {
          setPerson(person => ({
            ...person!,
            firstname: e.target.value
          }));
          if(e.target.value === "Ford") {
            setPerson(person => ({
              ...person!,
              surname: "Prefect",
              address: "Outer Space",
              email: "",
              phone: ""
            }))
          }
        }}
      />
      <LabeledInput
        label="Surname:"
        value={person.surname}
        onChange={(e) => {
          const newPerson = { ...person, surname: e.target.value }
          setPerson(person)
        }}
      />
      <LabeledInput
        label="Email:"
        value={person.email}
        onChange={(e) => {
          const newPerson = { ...person, email: e.target.value }
          setPerson(person)
        }}
      />
      <LabeledInput
        label="Address:"
        value={person.address}
        onChange={(e) => {
          const newPerson = { ...person, address: e.target.value }
          setPerson(person)
        }}
      />
      <LabeledInput
        label="Phone:"
        value={person.phone}
        onChange={(e) => {
          const newPerson = { ...person, phone: e.target.value }
          setPerson(person)
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