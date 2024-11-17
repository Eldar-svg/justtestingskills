import Root from "./Root";
import "./App.css";
import useToggleHook from "./useToggleHook";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Todocontext } from "./useReduceStates";
import { useContext, useState } from "react";
import Modal from "./Modal";
import useQueryFetch from "./useQueryFetch";
import usePages from "./usePages";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { state, dispatch } = useContext(Todocontext);
  const { handlePost, deleteQuery, fethcAgain } =
    useQueryFetch();

  const ToggleBtn = "Toggle";
  const allSelectedBtn = "selectAllBtn";
  const DeleteSelected = "DeleteSelected";

  const [ingredientBox, setIngredientBox] = useState([]);

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
      <button onClick={toCloseModal}>Add new coffee</button>
      <Modal closeModal={toCloseModal} showModal={inputState.CloseModal}>
        <form
          onSubmit={(e) => {
            handlePost(inputState, e);
            handlerinput("title",'')
            handlerinput("description",'')
            handlerinput("ingredients",'')
            toCloseModal();
          }}
        >
          <p>Title:</p>
          <input
            value={inputState.title}
            onChange={(e) => handlerinput("title", e.target.value)}
            type="text"
          />
          <p>Description:</p>
          <input
            value={inputState.description}
            onChange={(e) => handlerinput("description", e.target.value)}
            type="text"
          />
          <p>Image:</p>
          <input
            type="url"
            value={inputState.img}
            onChange={(e) => addImg(e.target.value)}
          />

          <p>Ingred:</p>
          <input
            value={inputState.ingredients}
            onChange={(e) => handlerinput("ingredients", e.target.value)}
            type="text"
          />

          <p>
            <button type="submit">Add</button>
          </p>
        </form>
      </Modal>

      <div>
        <button onClick={() => inputToggle("openSearch")}>
          {inputState.openSearch ? "close" : "Search bar"}
        </button>
        {inputState.openSearch ? (
          <input
            value={inputState.search}
            onChange={(e) => handlerinput("search", e.target.value)}
            type="text"
            placeholder="enter the searchable text"
          />
        ) : null}
      </div>

      <button onClick={fethcAgain}>
        {state.todo.length === 0 ? "Request Data" : "Refresh"}
      </button>
      <form>
        <label htmlFor="d">
          Choose All:
          <input
            type="checkbox"
            id="d"
            checked={state.allSelected}
            onChange={selectAllBtn}
          />
          <button onClick={deleteAll}>Clear</button>
        </label>
      </form>
      <Outlet />
      {selectedIngrid.map(({ id, ingredients, check }) => (
        <p key={id}>
          <input
            checked={check}
            onChange={(e) => toggleCheck(id, e.target.checked)}
            type="checkbox"
          />
          {`${ingredients}`}
        </p>
      ))}
      <ul style={{ listStyle: "none" }}>
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
              <li key={id}>
                <input
                  type="checkbox"
                  checked={check}
                  onChange={(e) => toggleCheck(id, e.target.checked)}
                />
                <NavLink to={`/products/${id}`}>{title}</NavLink>
                <p> {description}</p>
                <p>{ingredients}</p>
                <img src={image} alt={title} width="300" />
                <button onClick={() => deleteQuery(id)}>Delete</button>
              </li>
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
