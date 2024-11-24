import Root from "./Root";
import "./App.css";
import useToggleHook from "./useToggleHook";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Todocontext } from "./useReduceStates";
import { useContext, useState } from "react";

import useQueryFetch from "./useQueryFetch";
import usePages from "./usePages";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import MainFunck from "./mainstructure/MainFunck";

function App() {
  const { state, dispatch } = useContext(Todocontext);
  const { handlePost, deleteQuery, fethcAgain } = useQueryFetch();

  const ToggleBtn = "Toggle";
  const allSelectedBtn = "selectAllBtn";
  const DeleteSelected = "DeleteSelected";

  const [ingredientBox, setIngredientBox] = useState([]);
  const logdata = localStorage.getItem("role");
  const btntoggleING = (id, isChek) => {
    console.log(ingredientBox);
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

  const toCloseModal = () => inputToggle("CloseModal");

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
    currentItems,
    pages,
    handleNextPage,
    totalPages,
    currentPage,
    containerRef,
  } = usePages();

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
      {selectedIngrid.map(({ id, ingredients, check }) => (
        <p style={{ display: "flex", width: "30%", margin: "auto" }} key={id}>
          <input
            checked={check}
            onChange={(e) => toggleCheck(id, e.target.checked)}
            type="checkbox"
          />
          {`${ingredients}`}
        </p>
      ))}
      <ul
        style={{
          display: "flexbox",
          gap: "50px",

          margin: "auto",
          listStyle: "none",
          marginTop: "50px",

          alignItems: "stretch",
        }}
      >
        {currentItems
          .filter((prevSearch) => {
            const searchUpperCase = inputState.search.toLowerCase();

            const matchesSearch = prevSearch.title
              .toLowerCase()
              .includes(searchUpperCase);

            const matchesIngredient =
              ingredientBox.length === 0 ||
              ingredientBox.includes(prevSearch.id);

            return matchesSearch && matchesIngredient; // Показываем только те элементы, которые соответствуют поисковому запросу и выбранным ингредиентам
          })
          .map(({ id, title, description, ingredients, image, check }) => {
            return (
              <>
                <li style={{ width: "50%" }} key={id}>
                  <input
                    type="checkbox"
                    checked={check}
                    onChange={(e) => toggleCheck(id, e.target.checked)}
                  />
                  <NavLink to={`/products/${id}`}>{title}</NavLink>
                  <p> {description}</p>
                  <p>{ingredients}</p>
                  <img
                    style={{
                      width: "300px",
                      height: "300px",
                    }}
                    src={image}
                    alt={title}
                    width="300"
                  />
                  {logdata === "admin" && (
                    <button
                      style={{ display: "flex" }}
                      onClick={() => deleteQuery(id)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              </>
            );
          })}
      </ul>
      {pages.map((pages) => (
        <button onClick={() => handleNextPage(pages)} key={pages}>
          {pages}
        </button>
      ))}
      {totalPages > 0 ? (
        <p>
          Page {currentPage} of {totalPages}
        </p>
      ) : null}
    </div>
  );
}

export default App;
