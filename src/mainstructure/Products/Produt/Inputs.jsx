import React from "react";

function Inputs({
  onChangeInput,
  addImg,
  title,
  description,
  ingredients,
  img,
}) {
  return (
    <div>
      <p>Title:</p>
      <input value={title} onChange={onChangeInput("title")} type="text" />
      <p>Description:</p>
      <input
        value={description}
        onChange={onChangeInput("description")}
        type="text"
      />
      <p>Image:</p>
      <input type="url" value={img} onChange={onChangeInput("img")} />

      <p>Ingred:</p>
      <input
        value={ingredients}
        onChange={onChangeInput("ingredients")}
        type="text"
      />

      <p>
        <button type="submit">Add</button>
      </p>
    </div>
  );
}

export default Inputs;
