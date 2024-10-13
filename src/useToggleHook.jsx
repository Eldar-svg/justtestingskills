import  { useState } from "react";

function useToggleHook(inisialState = {}) {
  const [inputState, setInputState] = useState(inisialState);

  const handlerinput = (key, value) => {
    setInputState((prev) => {
      return { ...prev, [key]: value };
    });
  };
  
  const inputToggle = (inputkey) => {
    setInputState((prev) => {
      return { ...prev, [inputkey]: !prev[inputkey] };
    });
  };
 
  return {inputToggle, inputState, handlerinput};
}

export default useToggleHook;
