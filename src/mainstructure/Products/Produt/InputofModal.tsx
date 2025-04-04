import React from "react";
import Inputs from "./Inputs";
import { TodoItemInput } from "../../../hooks/useQueryFetch";

export interface InputModalProps {
  handlePost: (inputState: TodoItemInput) => void; // Используем тип из useQueryFetch
  handlerinput: (field: string, value: string) => void;
  addImg: (img: string) => void;
  inputState: TodoItemInput; // Используем TodoItemInput
  toCloseModal: () => void;

}
function InputofModal({
  handlePost,
  handlerinput,
  addImg,
  inputState,
  toCloseModal,
}:InputModalProps):JSX.Element{
  const { title, description, img, ingredients } = inputState;
  const onChangeInput = (input:string) => (e:React.ChangeEvent<HTMLFormElement>) => handlerinput(input, e.target.value);

  return (
    <div>
      <form
        onSubmit={() => {
          handlePost(inputState);
          handlerinput("title", "");
          handlerinput("description", "");
          handlerinput("ingredients", "");
          
          toCloseModal();
        }}
      >
        <Inputs
          onChangeInput={onChangeInput}
          addImg={addImg}
          title={title}
          description={description}
          ingredients={ingredients}
          img={img}
        />
      </form>
    </div>
  );
}

export default InputofModal;
