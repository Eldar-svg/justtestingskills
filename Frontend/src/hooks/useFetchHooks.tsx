import { useState } from "react";

import useToggleHook from "./useToggleHook";

export interface useFetchHooksResult {
  ingredientBox: string[];
  addImg: (file: string) => void;
}

function useFetchHooks(): useFetchHooksResult {
  const { handlerinput } = useToggleHook("");

  const [ingredientBox] = useState<string[]>([]);

  const addImg = (file: string): void => {
    handlerinput("img", file);
  };

  return { ingredientBox, addImg };
}

export default useFetchHooks;
