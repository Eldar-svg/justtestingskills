import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ModalResul {
  closeModal: () => void;
  children: React.ReactNode;
  showModal: boolean;
}

function Modal({
  closeModal,
  showModal,
  children,
}: ModalResul): JSX.Element | null {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
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
          
          transition={{ duration: 0.5, ease: "easeInOut", }}
           onClick={handleBackdropClick}
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black-blue z-50 disabled:opacity-50 disabled:pointer-events-none"
        >
         
         
        
          <div className="bg-white p-10 m-10 relative rounded-2xl shadow-xl max-w-md w-full">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 hover:animate-pulse"
              aria-label="Закрыть модальное окно"
            >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

            </button>
            {children}
          </div>
          
        </motion.div>
        )
      </AnimatePresence>
    </div>
  );
}

export default Modal;
