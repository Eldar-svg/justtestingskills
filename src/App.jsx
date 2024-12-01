import Root from "./Root";
import "./App.css";
import useToggleHook from "./useToggleHook";
import { Outlet } from "react-router-dom";
import { Todocontext } from "./useReduceStates";
import { useContext, useState } from "react";
import useQueryFetch from "./useQueryFetch";
import usePages from "./usePages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainFunck from "./mainstructure/MainFunck";
import CheckboxIng from "./mainstructure/CheckboxIng";
import MainCoffeList from "./coffe-list/MainCoffeList";
import Pages from "./coffe-list/Pages";

function App() {
  const { state, dispatch } = useContext(Todocontext);
  const { handlePost, deleteQuery, fethcAgain } = useQueryFetch();

  const ToggleBtn = "Toggle";
  const allSelectedBtn = "selectAllBtn";
  const DeleteSelected = "DeleteSelected";

  const [ingredientBox, setIngredientBox] = useState([]);

  const logdata = localStorage.getItem("role");
  const btntoggleING = (id, isChek) => {
    if (isChek) {
      setIngredientBox((item) => [...item, id]);
    } else {
      setIngredientBox((item) => item.filter((_id) => _id !== id));
    }
  };

  const { inputToggle, inputState, handlerinput } = useToggleHook({
    title: "",
    description: "",
    fresh: "",
    search: "",
    img: "",
    ingredients: "",
    openSearch: false,
    openForm: false,
    CloseModal: true,
    OpenModal: false,
  });

  const toggleCheck = (_id, value) => {
    dispatch({ type: ToggleBtn, payload: { id: _id, value } });
    btntoggleING(_id, value);
  };

  const selectAllBtn = () => {
    dispatch({ type: allSelectedBtn });
  };

  const addImg = (file) => {
    handlerinput("img", file);
  };

  const deleteAll = (e) => {
    e.preventDefault();
    dispatch({ type: DeleteSelected });
  };

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
