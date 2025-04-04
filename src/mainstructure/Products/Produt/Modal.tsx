import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";
 
export interface ModalResul {
  closeModal: ()=>void,
  children:React.ReactNode,
  showModal:boolean
}

function Modal({ closeModal, showModal, children }:ModalResul):JSX.Element|null{
  const handleBackdropClick = (e:React.MouseEvent<HTMLDivElement>):void => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (showModal) {
    return null;
  }

  return (
    <div>
      <AnimatePresence>
         
        (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="modal-overlay" onClick={handleBackdropClick}>
              <div className="modal-content">
                <button onClick={closeModal} className="close-button">
                  &times;
                </button>
                {children}
              </div>
            </div>
          </motion.div>
        )
      </AnimatePresence>
    </div>
  );
}

export default Modal;
