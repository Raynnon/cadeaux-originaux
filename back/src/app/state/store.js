import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./slices/menuSlice";
import categoriesReducer from "./slices/categoriesSlice";
import loginReducer from "./slices/loginSlice";

export const store = configureStore({
  reducer: {
    menu: menuSliceReducer,
    categories: categoriesReducer,
    login: loginReducer
  }
});
