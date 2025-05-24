import { useContext, useState } from "react";
import { Todocontext } from "./useReduceStates";
import useToggleHook from "./useToggleHook";



export interface useFetchHooksResult {
 
  ingredientBox: string[];
  addImg: (file: string) => void;
}

function useFetchHooks(): useFetchHooksResult {
 
  const { handlerinput } = useToggleHook("");

  const context = useContext(Todocontext);
  if (!context) {
    throw new Error("useFetchHooks must be used within a TodoProvider");
  }


  const [ingredientBox] = useState<string[]>([]);


  const addImg = (file: string): void => {
    handlerinput("img", file);
  };



  return { ingredientBox, addImg };
}

export default useFetchHooks;
