import React from "react";
import { useContext } from "react";
import { Todocontext } from "../../../hooks/useReduceStates";
import AddNewItem from "./AddNewItem";
import SearchBar from "./SearchBar";

import useQueryFetch from "../../../hooks/useQueryFetch";

function MainFunck({
  inputToggle,
  Modal,
  handlePost,
  handlerinput,
  addImg,
  logdata,
  toCloseModal,
  deleteAll,
  fetchAgain,
  inputState,
  selectAllBtn,
}) {
  const { state } = useContext(Todocontext);

  const { isLoading } = useQueryFetch();

  return (
    <div>
      <AddNewItem
        handlePost={handlePost}
        handlerinput={handlerinput}
        addImg={addImg}
        logdata={logdata}
        toCloseModal={toCloseModal}
        deleteAll={deleteAll}
        selectAllBtn={selectAllBtn}
        Modal={Modal}
        inputState={inputState}
      />
      <div>
        <SearchBar
          inputState={inputState}
          handlerinput={handlerinput}
          inputToggle={inputToggle}
        />
      </div>
      <button onClick={fetchAgain} disabled={isLoading}>
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
