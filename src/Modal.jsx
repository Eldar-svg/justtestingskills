import React from "react";

import "./Modal.css";
function Modal({ closeModal, showModal, children }) {

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
      };

  if (showModal) {
    return null;
  }

  return (
    <div>
  
      <div className="modal-overlay" onClick={handleBackdropClick}>
        <div className="modal-content">
          <button onClick={closeModal} className="close-button">
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
