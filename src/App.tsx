import Root from "./Root";
import useToggleHook from "./hooks/useToggleHook";
import { Outlet } from "react-router-dom";
import { useRef, useState, createContext } from "react";
import useQueryFetch from "./hooks/useQueryFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainFunck from "./mainstructure/Products/Produt/MainFunck";
 
import MainCoffeList from "./mainstructure/Products/coffe-list/MainCoffeList";
import Pages from "./mainstructure/Products/coffe-list/Pages";
import useFetchHooks from "./hooks/useFetchHooks";
import { ListofToggleHook } from "./mainstructure/Products/Produt/ListofToggleHook";
// Определение интерфейса DataContextStart
export interface DataContextStart {
  // Массив булевых значений
  logdata: string | null;
  deleteQuery: ((id: string) => void) | null; // Исправлено для согласованности
  CheckToggle: (id: string, value: boolean) => void;
}

// Создание контекста
export const DataContext = createContext<DataContextStart>({

  logdata: null,
  deleteQuery: null,
  CheckToggle: () => {},
});

function App(): JSX.Element {
  const [page, setPage] = useState<number>(1);
 // Добавлено состояние для check
  const { handlePost, deleteQuery, fetchAgain,CheckToggle,handleAll,BtnDelete } = useQueryFetch();
  const { ingredientBox, addImg } = useFetchHooks();
  const reff = useRef<HTMLDivElement | null>(null);
  const logdata = localStorage.getItem("role");

  const { inputToggle, inputState, handlerinput } = useToggleHook<ListofToggleHook>({
    id:"",
    title: "",
    description: "",
    fresh: "",
    image: "",
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
      handlerScrollUp={handlerScrollUp}
        inputToggle={inputToggle}
        handlePost={handlePost}
        handlerinput={handlerinput}
        addImg={addImg}
        logdata={logdata}
        toCloseModal={toCloseModal}
        fetchAgain={fetchAgain}
     page={page}
        inputState={inputState}
        CheckToggle={CheckToggle}
        handleAll={handleAll}
        BtnDelete={BtnDelete}
      />
      <DataContext.Provider
        value={{
          
          logdata,
          deleteQuery,
          CheckToggle
        }}
      >
        <Outlet />
      </DataContext.Provider>

      <MainCoffeList
        inputState={inputState}
        logdata={logdata}
        deleteQuery={deleteQuery}
        ingredientBox={ingredientBox}
        page={page}
        CheckToggle={CheckToggle}
      />

      <Pages page={page} handlerScrollUp={handlerScrollUp} /> {/* Убрал setPage */}
    </div>
  );
}

export default App;