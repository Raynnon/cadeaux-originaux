import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "../features/menuSlice";

export const store = configureStore({
  reducer: {
    menu: menuSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
