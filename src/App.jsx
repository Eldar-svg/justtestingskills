import Root from "./Root";
import "./App.css";
import useToggleHook from "./useToggleHook";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAxios from "./useAxios";
import { Todocontext } from "./useReduceStates";
import { useContext, useState } from "react";
import Modal from "./Modal";
function App() {
  const { state, dispatch } = useContext(Todocontext);

  const ToggleBtn = "Toggle";
  const allSelectedBtn = "selectAllBtn";
  const DeleteSelected = "DeleteSelected";

  const [ingredientBox, setIngredientBox] = useState([]);

  const btntoggleING = (id, isChek) => {
    if (isChek) {
      
      setIngredientBox((item) => [...item, id]);
    } else {
      setIngredientBox((item) => 

        item.filter((chex) => console.log(chex))
    
      );
      
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

  const toOpenModal = () => inputToggle("CloseModal");

  const toggleCheck = (_id, value) => {
    dispatch({ type: ToggleBtn, payload: { id: _id, value } });
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
    loading,
    error,
    getDataByCallback,
    postDataByCallback,
    deleteDataByCallback,
  } = useAxios();

  function DataAxsios() {
    getDataByCallback("https://api.sampleapis.com/coffee/iced");
  }
  const handlePost = (e) => {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      title: inputState.title,
      ingredients: inputState.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== ""),
      description: inputState.description,
      image: inputState.img,
    };

    postDataByCallback("https://api.sampleapis.com/coffee/iced", newTodo);
  };

  const handleDelete = (id) => {
    deleteDataByCallback("https://api.sampleapis.com/coffee/iced", id);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = state.todo.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(state.todo.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handleNextPage = (page) => {
    setCurrentPage(page);
  };

  const selectedIngrid = state.todo;

  return (
    <div className="App">
      <Root />
      <button onClick={toOpenModal}>Open</button>
      <Modal closeModal={toOpenModal} showModal={inputState.CloseModal}>
        <form onSubmit={handlePost}>
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
          {inputState.openSearch ? "close" : "open"}
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

      <button onClick={DataAxsios}>
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
            onChange={(e) => btntoggleING(id, e.target.checked)}
            type="checkbox"
          />
          {`${ingredients}`}
        </p>
      ))}
      <ul style={{ listStyle: "none" }}>
        {currentItems.filter((prevSearch) => {
  const searchUpperCase = inputState.search.toLowerCase();

  const matchesSearch = prevSearch.title.toLowerCase().includes(searchUpperCase);

  const matchesIngredient = ingredientBox.length === 0 || ingredientBox.includes(prevSearch.id); 

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
                <button onClick={() => handleDelete(id)}>Delete</button>
              </li>
            );
          })}
      </ul>
      {pages.map((pages) => (
        <button onClick={() => handleNextPage(pages)} key={pages}>
          {pages}
        </button>
      ))}

      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default App;
