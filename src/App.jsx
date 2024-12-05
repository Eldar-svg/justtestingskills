import Root from "./Root";
import "./App.css";
import useToggleHook from "./hooks/useToggleHook";
import { Outlet } from "react-router-dom";
import { Todocontext } from "./hooks/useReduceStates";
import { useContext } from "react";
import useQueryFetch from "./hooks/useQueryFetch";
import usePages from "./hooks/usePages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainFunck from "./mainstructure/Products/MainFunck";
import CheckboxIng from "./mainstructure/Products/CheckboxIng";
import MainCoffeList from "./coffe-list/MainCoffeList";
import Pages from "./coffe-list/Pages";
import useFetchHooks from "./hooks/useFetchHooks";

function App() {
  const { state } = useContext(Todocontext);
  const { handlePost, deleteQuery, fethcAgain } = useQueryFetch();
  const { toggleCheck, selectAllBtn, deleteAll, ingredientBox,addImg} =
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
        fethcAgain={fethcAgain}
        deleteAll={deleteAll}
        inputState={inputState}
      />
      <Outlet />
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
