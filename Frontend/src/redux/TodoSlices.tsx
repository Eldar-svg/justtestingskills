import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "../hooks/useReduceStates";
 

export interface GoodsState {
  goods: TodoItem[];
}

const actionsInSite = createSlice({
  name: "newAction",
  initialState: {
    goods: [],
  } as GoodsState,
  reducers: {
    setTodo: (state, action:  PayloadAction<TodoItem[]>) => {
      state.goods = action.payload;
    },
    toggleTodo: (
      state,
      action: { payload: { id: string; value: boolean } }
    ) => {
      const { id, value } = action.payload;
      const good = state.goods.find((item) => item.id === id);
      if (good) {
        good.check = value;
      }
    },
    deleteSelectedTodo: (state) => {
      state.goods = state.goods.filter((item) => !item.check);
    },
  },
});

export const { setTodo, toggleTodo, deleteSelectedTodo } =
  actionsInSite.actions;
export default actionsInSite.reducer;
