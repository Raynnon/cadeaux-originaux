import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./slices/menuSlice";
import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    menu: menuSliceReducer,
    categories: categoriesReducer
  }
});
