import React from "react";
import Inputs from "./Inputs";
import { ListofToggleHook } from "./ListofToggleHook";
type InputValues = string | number;
export interface InputModalProps {
  handlePost: (inputState: ListofToggleHook) => void; // Используем тип из useQueryFetch
  handlerinput: (field: string, value: InputValues) => void;
  inputState: ListofToggleHook; // Используем TodoItemInput
  toCloseModal: () => void;
  

}
function InputofModal({
  handlePost,
  handlerinput,
  inputState,
  toCloseModal,
}:InputModalProps):JSX.Element{
  const { title, description, image, ingredients } = inputState;
  const onChangeInput = (input:string) => (e:React.ChangeEvent<HTMLInputElement>) => handlerinput(input, e.target.value);

  return (
    <div >
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
          title={title}
          description={description}
          ingredients={ingredients}
          image={image}
        />
      </form>
    </div>
  );
}

export default InputofModal;
