import React, { ReactElement, useEffect, useRef, useState, useLayoutEffect } from "react"

export function Counter(): ReactElement {
  const [counter, setCounter] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    setTimeout(() => {
      button.current?.focus();
    }, 5000)
  }, []);

  useLayoutEffect(() => {
    if(button.current){
      button.current.style.backgroundColor = "green";
    }
  }, [])

  return (
    <div>
      <div>Count: {counter}</div>
      <div>
        <button
        ref={button}
          autoFocus
          className="btn btn-primary"
          onClick={() => setCounter(counter + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  )
}
