import React from "react";
import Modal from "./Modal";

function AddNewItem({
  handlePost,
  handlerinput,
  addImg,
  logdata,
  toCloseModal,
  inputState,
  title,
  description,
  img,
  ingredients,
  CloseModal,
}) {
  return (
    <div>
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
    </div>
  );
}

export default AddNewItem;
