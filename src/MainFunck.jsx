import React from "react";
import Modal from "./Modal";
import { useContext } from "react";
import { Todocontext } from "./useReduceStates";

function MainFunck({
  inputToggle,
  handlePost,
  handlerinput,
  addImg,
  logdata,
  toCloseModal,
  deleteAll,
  fethcAgain,
  inputState,
  selectAllBtn,
}) {
  const { state } = useContext(Todocontext);
  const {
    title,
    description,
    img,
    search,
    ingredients,
    openSearch,
    CloseModal,
  } = inputState;
  return (
    <div>
      {" "}
      {logdata === "admin" && (
        <>
          <button onClick={toCloseModal}>Add new coffee</button>
          <Modal closeModal={toCloseModal} showModal={CloseModal}>
            <form
              onSubmit={(e) => {
                handlePost(inputState, e);
                handlerinput("title", "");
                handlerinput("description", "");
                handlerinput("ingredients", "");
                toCloseModal();
              }}
            >
              <p>Title:</p>
              <input
                value={title}
                onChange={(e) => handlerinput("title", e.target.value)}
                type="text"
              />
              <p>Description:</p>
              <input
                value={description}
                onChange={(e) => handlerinput("description", e.target.value)}
                type="text"
              />
              <p>Image:</p>
              <input
                type="url"
                value={img}
                onChange={(e) => addImg(e.target.value)}
              />

              <p>Ingred:</p>
              <input
                value={ingredients}
                onChange={(e) => handlerinput("ingredients", e.target.value)}
                type="text"
              />

              <p>
                <button type="submit">Add</button>
              </p>
            </form>
          </Modal>
        </>
      )}
      <div>
        <button onClick={() => inputToggle("openSearch")}>
          {openSearch ? "close" : "Search bar"}
        </button>
        {openSearch ? (
          <input
            value={search}
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
          {logdata === "admin" && <button onClick={deleteAll}>Clear</button>}
        </label>
      </form>
    </div>
  );
}

export default MainFunck;
