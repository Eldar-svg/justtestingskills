import { configureStore } from '@reduxjs/toolkit';
import actionsInSite from './TodoSlices'
import ToastActSlice from './ToastSlice'
const store = configureStore({
  reducer: {
    newAct: actionsInSite,
    toastAct: ToastActSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store