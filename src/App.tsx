import Root from "./Root";
import useToggleHook from "./hooks/useToggleHook";
import { Outlet } from "react-router-dom";
import { useRef, useState, createContext } from "react";
import useQueryFetch from "./hooks/useQueryFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainFunck from "./mainstructure/Products/Produt/MainFunck";
import CheckboxIng from "./mainstructure/Products/Produt/CheckboxIng";
import MainCoffeList from "./mainstructure/Products/coffe-list/MainCoffeList";
import Pages from "./mainstructure/PreviousPage/Pagination";
import useFetchHooks from "./hooks/useFetchHooks";

// Определение интерфейса DataContextStart
export interface DataContextStart {
  check?: boolean[]; // Массив булевых значений
  logdata: string | null;
  deleteQuery: ((id: string) => void) | null; // Исправлено для согласованности
  toggleCheck: (id: string, value: boolean) => void;
}

// Создание контекста
export const DataContext = createContext<DataContextStart>({
  check: [],
  logdata: null,
  deleteQuery: null,
  toggleCheck: () => {},
});

function App(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [check, setCheck] = useState<boolean[]>([]); // Добавлено состояние для check
  const { handlePost, deleteQuery, fetchAgain } = useQueryFetch();
  const { toggleCheck, selectAllBtn, deleteAll, ingredientBox, addImg } = useFetchHooks();
  const reff = useRef<HTMLDivElement | null>(null);
  const logdata = localStorage.getItem("role");

  const { inputToggle, inputState, handlerinput } = useToggleHook({
    title: "",
    description: "",
    fresh: "",
    img: "",
    search: "",
    ingredients: "",
    openSearch: false,
    openForm: false,
    CloseModal: true,
    OpenModal: false,
  });

  const handlerScrollUp = (pageNum: number): void => {
    setPage(pageNum);
    if (reff.current) {
      reff.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toCloseModal = () => inputToggle("CloseModal");

  return (
    <div ref={reff} className="App">
      <ToastContainer
        stacked
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />

      <Root />
      <MainFunck
        inputToggle={inputToggle}
        handlePost={handlePost}
        handlerinput={handlerinput}
        addImg={addImg}
        selectAllBtn={selectAllBtn}
        logdata={logdata}
        toCloseModal={toCloseModal}
        fetchAgain={fetchAgain}
        deleteAll={deleteAll}
        inputState={inputState}
        page={page}
      />
      <DataContext.Provider
        value={{
          check,
          logdata,
          deleteQuery,
          toggleCheck,
        }}
      >s
        <Outlet />
      </DataContext.Provider>
      {/* <CheckboxIng toggleCheck={toggleCheck} /> */}

      <MainCoffeList
        inputState={inputState}
        logdata={logdata}
        deleteQuery={deleteQuery}
        toggleCheck={toggleCheck}
        ingredientBox={ingredientBox}
        page={page}
      />

      <Pages page={page} handlerScrollUp={handlerScrollUp} /> {/* Убрал setPage */}
    </div>
  );
}

export default App;