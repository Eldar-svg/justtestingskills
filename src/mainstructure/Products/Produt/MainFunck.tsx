import { useContext } from "react";
import { Todocontext } from "../../../hooks/useReduceStates";
import AddNewItem from "./AddNewItem";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import useQueryFetch from "../../../hooks/useQueryFetch";
import { InputModalProps } from "./InputofModal";

import { ListofToggleHook } from "./ListofToggleHook";

import { UseQueryResults } from "../../../hooks/useQueryFetch";
import CheckboxIng from "./CheckboxIng";

interface MainFunctionResult
  extends InputModalProps,
    Pick<UseQueryResults, "fetchAgain" | "CheckToggle"> {
  logdata: string | null;
  inputToggle: (key: keyof ListofToggleHook) => void;
  page: number;
  inputState: ListofToggleHook;
  addImg: (file: string) => void;
  handleAll: (value: boolean) => void;
  BtnDelete: () => void;
  handlerScrollUp: (pageNum: number) => void;
}

function MainFunck({
  page,
  inputToggle,
  handlePost,
  handlerinput,
  addImg,
  logdata,
  toCloseModal,
  handlerScrollUp,
  fetchAgain,
  inputState,
  CheckToggle,
  handleAll,
  BtnDelete,
}: MainFunctionResult): JSX.Element {
  const context = useContext(Todocontext);
  if (!context) {
    throw new Error("useFetchHooks must be used within a TodoProvider");
  }

  const { state } = context;

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleAll(e.target.checked)
            }
          />
        </label>
        <CheckboxIng
          CheckToggle={CheckToggle}
          handlerScrollUp={handlerScrollUp}
          page={page}
        />
      </form>
      {logdata === "admin" && <button onClick={BtnDelete}>Clear</button>}
    </div>
  );
}

export default MainFunck;
