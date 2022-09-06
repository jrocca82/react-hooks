import { useState, useEffect, useCallback } from "react"
import localforage, { clear } from "localforage"
import type { Person } from "../../types/person";
import useIsMounted from "./useIsMounted";
import useDebounce from "./useDebounce";

const savePerson = (person: Person | null) => {
  console.log("saving", person)
  localforage.setItem("person", person)
}

const usePerson = (initialPerson: Person) => {
  const [person, setPerson] = useState<Person | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person");
      if (isMounted.current) {
        setPerson(person ?? initialPerson);
      }
    }
    getPerson();
  }, [initialPerson, isMounted]);

  const [, setNow] = useState(new Date());

  useEffect(() => {
    const handle = setInterval(() => setNow(new Date()));
    return () => clearInterval(handle);
  }, [])

  const saveFn = useCallback(() => {
    savePerson(person);
  }, [person]);

  useDebounce(saveFn, 2000);

  return [person, setPerson] as const;
};

export default usePerson;
