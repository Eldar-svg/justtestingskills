import Root from "./Root";
import "./App.css";
import useToggleHook from "./hooks/useToggleHook";
import { Outlet } from "react-router-dom";
import { Todocontext } from "./hooks/useReduceStates";
import { useContext, createContext } from "react";
import useQueryFetch from "./hooks/useQueryFetch";
import usePages from "./hooks/usePages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainFunck from "./mainstructure/Products/Produt/MainFunck";
import CheckboxIng from "./mainstructure/Products/Produt/CheckboxIng";
import MainCoffeList from "./mainstructure/Products/coffe-list/MainCoffeList";
import Pages from "./mainstructure/Products/coffe-list/Pages";
import useFetchHooks from "./hooks/useFetchHooks";
export const DataContext = createContext({
  check: [],
  logdata: null,
  deleteQuery: null,
  toggleCheck: () => {},
});
function App() {
  const { state } = useContext(Todocontext);
  const { handlePost, deleteQuery, fetchAgain } = useQueryFetch();
  const { check, toggleCheck, selectAllBtn, deleteAll, ingredientBox, addImg } =
    useFetchHooks();

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

  const {
    containerRef,
    handleNextPage,
    pages,
    totalPages,
    currentPage,
    currentItems,
  } = usePages();

  const toCloseModal = () => inputToggle("CloseModal");
  const selectedIngrid = state.todo;

  return (
    <div ref={containerRef} className="App">
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
      />
      <DataContext.Provider
        value={{
          check,
          logdata,
          deleteQuery,
          toggleCheck,
        }}
      >
        <Outlet />
      </DataContext.Provider>
      <CheckboxIng toggleCheck={toggleCheck} selectedIngrid={selectedIngrid} />

      <MainCoffeList
        inputState={inputState}
        logdata={logdata}
        deleteQuery={deleteQuery}
        toggleCheck={toggleCheck}
        ingredientBox={ingredientBox}
        currentItems={currentItems}
      />

      <Pages
        totalPages={totalPages}
        pages={pages}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
