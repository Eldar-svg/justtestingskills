import Root from "./Root";

import useToggleHook from "./hooks/useToggleHook";
import { Outlet } from "react-router-dom";
import { useRef } from "react";
import { createContext, useState } from "react";
import useQueryFetch from "./hooks/useQueryFetch";

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
  const [page, setPage] = useState(1);
  const { handlePost, deleteQuery, fetchAgain } = useQueryFetch();
  const { check, toggleCheck, selectAllBtn, deleteAll, ingredientBox, addImg } =
    useFetchHooks();
  const reff = useRef(null);
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

  const handlerScrollUp = (pageNum) => {
    setPage(pageNum); // Устанавливаем новую страницу
    if (reff.current) {
      reff.current.scrollIntoView({ behavior: "smooth" }); // Прокручиваем к элементу
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
      >
        <Outlet />
      </DataContext.Provider>
      {/* <CheckboxIng toggleCheck={toggleCheck}  /> */}

      <MainCoffeList
        inputState={inputState}
        logdata={logdata}
        deleteQuery={deleteQuery}
        toggleCheck={toggleCheck}
        ingredientBox={ingredientBox}
        page={page}
        reff={reff}
      />

      <Pages page={page} setPage={setPage} handlerScrollUp={handlerScrollUp} />
    </div>
  );
}

export default App;
