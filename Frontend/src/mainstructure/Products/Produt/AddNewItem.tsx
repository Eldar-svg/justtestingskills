import React from "react";
import Modal from "./Modal";
import InputofModal from "./InputofModal";
import { InputModalProps } from "./InputofModal";
import { ModalResul } from "./Modal";
import { motion } from "framer-motion";

export interface AddNameItemResult extends InputModalProps {
  logdata: string | null;
  Modal: React.FC<ModalResul>;
   addImg: (file: string) => void;
 
}

function AddNewItem({
  handlePost,
  handlerinput,
 
  logdata,
  toCloseModal,
  inputState,
}: AddNameItemResult): JSX.Element {
  return (
    <div  >
      {logdata === "admin" && (
        <>
          <motion.button whileTap={{ scale: 0.9 }} className="mainbtn" onClick={toCloseModal}>Add new coffee</motion.button>
          <Modal closeModal={toCloseModal} showModal={inputState.CloseModal}>
            <InputofModal
              toCloseModal={toCloseModal}
              handlePost={handlePost}
              handlerinput={handlerinput}
          
              inputState={inputState}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export default AddNewItem;
