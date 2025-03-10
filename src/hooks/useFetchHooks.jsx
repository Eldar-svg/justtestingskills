import { useContext, useState } from "react";
import { Todocontext } from "./useReduceStates";
import useToggleHook from "./useToggleHook";
function useFetchHooks() {
  const {  handlerinput } = useToggleHook()

  const { dispatch } = useContext(Todocontext);
  const [ingredientBox, setIngredientBox] = useState([]);
  const ToggleBtn = "Toggle";
  const allSelectedBtn = "selectAllBtn";
  const DeleteSelected = "DeleteSelected";

  

  const btntoggleING = (id, isChek) => {
    if (isChek) {
      setIngredientBox((item) => [...item, id]);
    } else {
      setIngredientBox((item) => item.filter((_id) => _id !== id));
    }
  };


  const toggleCheck = (_id, value) => {
    dispatch({ type: ToggleBtn, payload: { id: _id, value } });
    btntoggleING(_id, value);
  };

  const addImg = (file) => {
    handlerinput("img", file);
  };

  const selectAllBtn = () => {
    dispatch({ type: allSelectedBtn });
  };


  const deleteAll = (e) => {
    e.preventDefault();
    dispatch({ type: DeleteSelected });
  };

  return { toggleCheck, selectAllBtn,  deleteAll, ingredientBox,addImg };
}

export default useFetchHooks;
