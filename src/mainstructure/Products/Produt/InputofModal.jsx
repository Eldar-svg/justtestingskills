import React from "react";
import Inputs from "./Inputs";
function InputofModal({
  handlePost,
  handlerinput,
  addImg,
  inputState,
  toCloseModal,
}) {
  const { title, description, img, ingredients } = inputState;
  const onChangeInput = (input) => (e) => handlerinput(input, e.target.value);

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
