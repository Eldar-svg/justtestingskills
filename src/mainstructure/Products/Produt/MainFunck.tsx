import { useContext } from "react";
import { Todocontext } from "../../../hooks/useReduceStates";
import AddNewItem from "./AddNewItem";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import useQueryFetch from "../../../hooks/useQueryFetch";
import { InputModalProps } from "./InputofModal";
 
 
import { UseQueryResults } from "../../../hooks/useQueryFetch";

interface MainFunctionResult extends InputModalProps, Pick<UseQueryResults, "fetchAgain"> {
  logdata: string|null;
  inputToggle: (inputkey: string) => void;
  deleteAll: (e: React.FormEvent) => void;
  selectAllBtn: ()=>void
  
}

function MainFunck({
  inputToggle,
  handlePost,
  handlerinput,
  addImg,
  logdata,
  toCloseModal,
  deleteAll,
  fetchAgain,
  inputState,
  selectAllBtn,
}: MainFunctionResult):JSX.Element {
 
  const context = useContext(Todocontext);
  if (!context) {
    throw new Error("useFetchHooks must be used within a TodoProvider");
  }

  const { state } = context


  const { isLoading } = useQueryFetch();

  return (
    <div>
      <div
        style={{
          gap: "20px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "yellow",
          padding: "30px",
          marginBottom: "20px",
        }}
      >
        <AddNewItem
          handlePost={handlePost}
          handlerinput={handlerinput}
          addImg={addImg}
          logdata={logdata}
          toCloseModal={toCloseModal}
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
        <button
          style={{ maxWidth: "10%" }}
          onClick={fetchAgain}
          disabled={isLoading}
        >
          {state.todo.length === 0 ? "Request Data" : "Refresh"}
        </button>
      </div>
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
