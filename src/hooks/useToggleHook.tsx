import { useState } from "react";

type InputValues = string | number | boolean;

export interface InputState {
  [key: string]: InputValues;
}

interface UseToggleHookReturn {
  inputState: InputState;
  handlerinput: (key: string, value: InputValues) => void;
  inputToggle: (inputkey: string) => void;
}
function useToggleHook(inisialState: InputState = {}): UseToggleHookReturn {
  const [inputState, setInputState] = useState<InputState>(inisialState);

  const handlerinput = (key: string, value: InputValues): void => {
    setInputState((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const inputToggle = (inputkey: string): void => {
    setInputState((prev) => {
      return { ...prev, [inputkey]: !prev[inputkey] };
    });
  };

  return { inputToggle, inputState, handlerinput };
}

export default useToggleHook;
