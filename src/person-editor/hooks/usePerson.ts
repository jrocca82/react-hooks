import {
  useState,
  useEffect,
  useCallback,
  useDebugValue,
  SetStateAction,
  useReducer,
  useMemo,
} from "react"
import localforage, { clear } from "localforage"
import type { Person } from "../../types/person"
import useIsMounted from "./useIsMounted"
import useWillUnmount from "./useWillUnmount"
import useThrottle from "./useThrottle"
import personEditorReducer from "./usePersonReducer"

const savePerson = (person: Person | null) => {
  console.log("saving", person)
  localforage.setItem("person", person)
}

interface Metadata {
  isDirty: boolean
  isValid: boolean
}

const usePerson = (initialPerson: Person) => {
  const [{ person, metadata }, dispatch] = useReducer(personEditorReducer, {
    person: null,
    metadata: { isDirty: false, isValid: true },
  })

  const isMounted = useIsMounted()

  useDebugValue(person, (p) => `${p?.firstname} ${p?.surname}`)

  const firstAndSurname = useMemo(
    () => ({
      firstname: person?.firstname,
      surname: person?.surname
    }), [person?.firstname, person?.surname]);

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person")
      if (isMounted.current) {
        dispatch({
          type: "set-initial-person",
          payload: person ?? initialPerson
        })
      }
    }
    getPerson()
  }, [initialPerson, isMounted])

  // const [, setNow] = useState(new Date())

  // useEffect(() => {
  //   const handle = setInterval(() => setNow(new Date()))
  //   return () => clearInterval(handle)
  // }, [])


  const saveFn = useCallback(() => {
    savePerson(person)
  }, [person])

  useThrottle(saveFn, 1000)
  useWillUnmount(saveFn)

  const setProperty = (name: keyof Person, value: unknown) => {
    dispatch({type: "set-property", payload: { name, value}})
  }

  const setProperties = (payload: Partial<Person>) => {
    dispatch({type: "set-properties", payload})
  }

  const setPersonAndMeta = (value: SetStateAction<Person | null>) => {
    // setPerson(value)
    // setMetadata((m) => ({ ...m, isDirty: true }))
  }

  return [person, setProperty, setProperties, metadata, firstAndSurname] as const
}

export default usePerson
