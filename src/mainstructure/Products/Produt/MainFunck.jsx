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
    <div  >
     <div style={{gap:"20px",justifyContent:"center",display:"flex",flexDirection:"row", alignItems:"center",backgroundColor:"yellow",padding:"30px",marginBottom:"20px"}}>
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
      <>
        <SearchBar
          inputState={inputState}
          handlerinput={handlerinput}
          inputToggle={inputToggle}
        />
      </>
      <button style={{maxWidth:"10%"}} onClick={fetchAgain} disabled={isLoading}>
        {state.todo.length === 0 ? "Request Data" : "Refresh"}
      </button></div>
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
