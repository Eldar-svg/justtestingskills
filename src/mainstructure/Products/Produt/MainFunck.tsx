import { useContext,useEffect } from "react";
import { Todocontext } from "../../../hooks/useReduceStates";
import AddNewItem from "./AddNewItem";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import useQueryFetch from "../../../hooks/useQueryFetch";
import { InputModalProps } from "./InputofModal";

import { ListofToggleHook } from "./ListofToggleHook";

import { UseQueryResults } from "../../../hooks/useQueryFetch";
import usePaginatedProducts from "../../../hooks/usePaginatedProducts";
import Checkboxs from "./Checkboxs";

export interface MainFunctionResult
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

    const { data } = usePaginatedProducts("goods",page)

  const context = useContext(Todocontext);
  if (!context) {
    throw new Error("useFetchHooks must be used within a TodoProvider");
  }
 

   console.log()
  const { isLoading } = useQueryFetch();

  return (
    <div className="flex w-full max-w-[1000px] mx-auto p-1 mb-6  gap-5 mt-[70px]">
      <div className=" w-full flex flex-col text-center bg-opacity-[70%] bg-red-300  p-5 shadow-xl  gap-2 rounded-2xl ">
        <AddNewItem
          handlePost={handlePost}
          handlerinput={handlerinput}
          addImg={addImg}
          logdata={logdata}
          toCloseModal={toCloseModal}
          Modal={Modal}
          inputState={inputState}
        />

        <SearchBar
          inputState={inputState}
          handlerinput={handlerinput}
          inputToggle={inputToggle}
        />

        <button className="mainbtn" onClick={fetchAgain} disabled={isLoading}>
          {data?.goods.length ? "Refresh": "Request Data" }
        </button>
      </div>

      {data?.goods.length ? (
          <Checkboxs
          logdata={logdata}
          CheckToggle={CheckToggle}
          handleAll={handleAll}
          BtnDelete={BtnDelete}
          handlerScrollUp={handlerScrollUp}
          page={page}
        />
      ) : (
      <p>gg</p>
      )}
    </div>
  );
}

export default MainFunck;
