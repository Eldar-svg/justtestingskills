import React, { createContext, useReducer } from "react";
import { toast } from "react-toastify";

// Создаём контекст для Toast
export const ToastContext = createContext();

const toastActionTypes = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  ADDED: "ADDED",
  ERROR_ADDED: "ERROR_ADDED",
  SET_TOAST_ID: "SET_TOAST_ID",
  LOADED: "LOADED",
};

function toastReducer(state, action) {
  switch (action.type) {
    case toastActionTypes.SUCCESS:
      toast.update(state.toastId, {
        render: "Data loaded!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return { ...state, isLoading: false };

    case toastActionTypes.ERROR:
      toast.update(state.toastId, {
        render: "Failed to load",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return { ...state, isLoading: false };

    case toastActionTypes.ADDED:
      toast.update(state.toastId, {
        render: "Data added!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return { ...state, isLoading: false };

    case toastActionTypes.ERROR_ADDED:
      toast.update(state.toastId, {
        render: `Error: ${action.payload.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return { ...state, isLoading: false };

    case toastActionTypes.LOADED:
      toast.update(state.toastId, {
        render: "Data loaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return { ...state, isLoading: false };

    case toastActionTypes.SET_TOAST_ID:
      return { ...state, toastId: action.payload, isLoading: true };

    default:
      return state;
  }
}

export default function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, {
    toastId: null,
    isLoading: false,
  });

  const triggerToast = (message, options = {}) => {
    const id = toast.loading(message, { autoClose: false, ...options });
    dispatch({ type: toastActionTypes.SET_TOAST_ID, payload: id });
  };

  return (
    <ToastContext.Provider
      value={{
        state,
        dispatch,
        triggerToast,
        toastActionTypes,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
