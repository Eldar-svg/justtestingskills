import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast, ToastOptions } from "react-toastify";

interface ToastState {
  toastId: string | number | null;
  isLoading: boolean;
}

const initialState: ToastState = {
  toastId: null,
  isLoading: false,
};

const updateToast = (
  toastId: string | number | null,
  render: string,
  type: "success" | "error" | "info" | "warning",
  isLoading: boolean,
  autoClose: number
): void => {
  if (toastId !== null) {
    toast.update(toastId, {
      render,
      type,
      isLoading,
      autoClose,
    });
  }
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastId: (
      state,
      action: PayloadAction<{
        id: string | number;
        message: string;
        options?: ToastOptions;
      }>
    ) => {
      const { id, message, options } = action.payload;
      state.toastId = id;
      state.isLoading = true;
      toast.loading(message, { toastId: id, autoClose: false, ...options });
    },
    success: (state) => {
      updateToast(state.toastId, "Data loaded!", "success", false, 3000);
      state.isLoading = true;
    },
    error: (state) => {
      updateToast(state.toastId, "Failed to load", "error", false, 5000);
      state.isLoading = true;
    },
    secondError: (state, action: PayloadAction<{ message: string }>) => {
      updateToast(
        state.toastId,
        `Error: ${action.payload.message}`,
        "error",
        false,
        5000
      );
      state.isLoading = false;
    },
    added: (state) => {
      updateToast(state.toastId, "Data added!", "success", false, 3000);
      state.isLoading = false;
    },
    loaded: (state) => {
      updateToast(
        state.toastId,
        "Data loaded successfully!",
        "success",
        false,
        3000
      );
      state.isLoading = false;
    },
  },
});

export const { setToastId, success, error, secondError, added, loaded } =
  toastSlice.actions;
export default toastSlice.reducer;
