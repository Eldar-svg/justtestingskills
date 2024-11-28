import React from "react";
import { useContext } from "react";
import { Todocontext } from "../useReduceStates";
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
        inputState={inputState}
        selectAllBtn={selectAllBtn}
        Modal={Modal}
        {...inputState}
      />
      <div>
        <SearchBar
          handlerinput={handlerinput}
          inputToggle={inputToggle}
          {...inputState}
        />
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
