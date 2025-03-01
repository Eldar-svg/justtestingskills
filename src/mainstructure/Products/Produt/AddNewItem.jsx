import React from "react";
import Modal from "./Modal";
import InputofModal from "./InputofModal";

function AddNewItem({
  handlePost,
  handlerinput,
  addImg,
  logdata,
  toCloseModal,
  inputState,
}) {
  return (                        
    <div >
      {logdata === "admin" && (
        <>
          <button onClick={toCloseModal}>Add new coffee</button>
          <Modal closeModal={toCloseModal} showModal={inputState.CloseModal}>
            <InputofModal
              toCloseModal={toCloseModal}
              handlePost={handlePost}
              handlerinput={handlerinput}
              addImg={addImg}
              inputState={inputState}
            />
          </Modal>
        </>                            
      )}
    </div>
  );
}

export default AddNewItem;
