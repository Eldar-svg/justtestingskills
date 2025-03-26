import { useContext, useState } from "react";
import { Todocontext } from "./useReduceStates";
import useToggleHook from "./useToggleHook";



interface useFetchHooksResult {
  toggleCheck: (id: number, value: boolean) => void;
  selectAllBtn: () => void;
  deleteAll: (e: React.FormEvent) => void;
  ingredientBox: number[];
  addImg: (file: string) => void;
}

function useFetchHooks(): useFetchHooksResult {
 
  const { handlerinput } = useToggleHook();

  const context = useContext(Todocontext);
  if (!context) {
    throw new Error("useFetchHooks must be used within a TodoProvider");
  }

  const { dispatch } = context
  const [ingredientBox, setIngredientBox] = useState<number[]>([]);

  const btntoggleING = (id: number, isChek: boolean): void => {
    if (isChek) {
      setIngredientBox((item) => [...item, id]);
    } else {
      setIngredientBox((item) => item.filter((_id) => _id !== id));
    }
  };

  const toggleCheck = (_id: number, value: boolean): void => {
    dispatch({ type: "Toggle", payload: { id: _id, value } });
    btntoggleING(_id, value);
  };

  const addImg = (file: string): void => {
    handlerinput("img", file);
  };

  const selectAllBtn = (): void => {
    dispatch({ type: "selectAllBtn" });
  };

  const deleteAll = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch({ type: "DeleteSelected" });
  };

  return { toggleCheck, selectAllBtn, deleteAll, ingredientBox, addImg };
}

export default useFetchHooks;
