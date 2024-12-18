import React from "react";
import { useContext } from "react";
import { Todocontext } from "../../../hooks/useReduceStates"
import AddNewItem from "./AddNewItem";
import SearchBar from "./SearchBar";

function MainFunck({
  inputToggle,
  Modal,
  handlePost,
  handlerinput,
  addImg,
  logdata,
  toCloseModal,
  deleteAll,
  fethcAgain,
  inputState,
  selectAllBtn,
}) {
  const { state } = useContext(Todocontext);

  return (
    <div>
      <AddNewItem
        handlePost={handlePost}
        handlerinput={handlerinput}
        addImg={addImg}
        logdata={logdata}
        toCloseModal={toCloseModal}
        deleteAll={deleteAll}
        fethcAgain={fethcAgain}
        selectAllBtn={selectAllBtn}
        Modal={Modal}
        inputState= {inputState}
      />
      <div>
        <SearchBar inputState ={inputState} handlerinput={handlerinput} inputToggle={inputToggle} />
      </div>
      <button onClick={fethcAgain}>
        {state.todo.length === 0 ? "Request Data" : "Refresh"}
      </button>
      <form>
        <label htmlFor="d">
          Choose All:
          <input
            type="checkbox"
            id="d"
            checked={state.allSelected}
            onChange={selectAllBtn}
          />
          {logdata === "admin" && <button onClick={deleteAll}>Clear</button>}
        </label>
      </form>
    </div>
  );
}

export default MainFunck;
