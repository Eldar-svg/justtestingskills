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
    <div className="text-xl flex flex-col " >
      <div ><p>Title:</p>
      <input className="inputbtn w-full" value={title} onChange={onChangeInput("title")} type="text" />
      <p>Description:</p>
      <input className="inputbtn w-full"
        value={description}
        onChange={onChangeInput("description")}
        type="text"
      />
      <p>Image:</p>
      <input className="inputbtn w-full" type="url" value={image} onChange={onChangeInput("image")} />

      <p>Ingred:</p>
      <input className="inputbtn w-full"
        value={ingredients}
        onChange={onChangeInput("ingredients")}
        type="text"
      />

      
        <button className="mt-5 mainbtn transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-110 easy-in hover:drop-shadow-md" type="submit">Add</button>
      </div>
    </div>
  );
}

export default Inputs;
