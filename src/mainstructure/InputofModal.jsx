import React from "react";

function InputofModal({ handlePost, handlerinput, addImg, inputState, toCloseModal }) {

const {title,ingredients,description,img} = inputState

const onChangeInput =(input)=> (e)=> handlerinput(input, e.target.value)
  return (
    <div>
     
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
          onChange={onChangeInput(title)}
          type="text"
        />
        <p>Description:</p>
        <input
          value={description}
          onChange={onChangeInput(description)}
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
          onChange={onChangeInput(ingredients)}
          type="text"
        />

        <p>
          <button type="submit">Add</button>
        </p>
      </form>
    </div>
  );
}

export default InputofModal;
