import React from "react";

interface InputsResult {
  title: string;
  description: string;
  ingredients: string;
  image: string;
  onChangeInput: (
    input: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Inputs({
  onChangeInput,
  title,
  description,
  ingredients,
  image,
}: InputsResult) {
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
      <input type="url" value={image} onChange={onChangeInput("image")} />

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
