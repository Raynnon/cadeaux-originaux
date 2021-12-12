import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./store/slices/menuSlice";
import categoriesReducer from "./store/slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    menu: menuSliceReducer,
    categories: categoriesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
