import { useState } from "react";
//проанализировать тайпскрипт
type InputValues = string | number | boolean;

export interface UseToggleHookReturn<T> {
  inputState: T;
  handlerinput: (field: string, value: InputValues) => void; // Изменено
  inputToggle: (key: keyof T) => void;
}

function useToggleHook<T>(initialState: T): UseToggleHookReturn<T> {
  const [inputState, setInputState] = useState<T>(initialState);

  const handlerinput = (field: string, value: InputValues): void => {
    setInputState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const inputToggle = (key: keyof T): void => {
    setInputState((prev) => {
      const currentValue = prev[key];
      if (typeof currentValue === "boolean") {
        return { ...prev, [key]: !currentValue };
      }
      return prev;
    });
  };

  return { inputToggle, inputState, handlerinput };
}

export default useToggleHook;