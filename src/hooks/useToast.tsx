import React, { createContext, useReducer, ReactNode } from "react";
import { toast, ToastOptions } from "react-toastify";

 
interface ToastState {
  toastId: string | number | null;  
  isLoading: boolean;
}

// Типы действий
type ToastAction =
  | { type: "SUCCESS" }
  | { type: "ERROR" }
  | { type: "ADDED" }
  | { type: "ERROR_ADDED"; payload: { message: string } }  
  | { type: "SET_TOAST_ID"; payload: string | number }   
  | { type: "LOADED" };

// Тип значения контекста
export interface ToastContextValue {
  state: ToastState;
  dispatch: React.Dispatch<ToastAction>;
  triggerToast: (message: string, options?: ToastOptions) => void;
}

// Создаём контекст
export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Редюсер
function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "SUCCESS":
      toast.update(state.toastId!, { // ! — уверены, что toastId не null
        render: "Data loaded!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return { ...state, isLoading: false };

    case "ERROR":
      toast.update(state.toastId!, {
        render: "Failed to load",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return { ...state, isLoading: false };

    case "ADDED":
      toast.update(state.toastId!, {
        render: "Data added!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return { ...state, isLoading: false };

    case "ERROR_ADDED":
      toast.update(state.toastId!, {
        render: `Error: ${action.payload.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return { ...state, isLoading: false };

    case "LOADED":
      toast.update(state.toastId!, {
        render: "Data loaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return { ...state, isLoading: false };

    case "SET_TOAST_ID":
      return { ...state, toastId: action.payload, isLoading: true };

    default:
      return state;
  }
}

 
interface ToastProviderProps {
  children: ReactNode;
}

 
export default function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(toastReducer, {
    toastId: null,
    isLoading: false,
  });

  const triggerToast = (message: string, options?: ToastOptions) => {
    const id = toast.loading(message, { autoClose: false, ...options });
    dispatch({ type: "SET_TOAST_ID", payload: id });
  };

  return (
    <ToastContext.Provider
      value={{
        state,
        dispatch,
        triggerToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}