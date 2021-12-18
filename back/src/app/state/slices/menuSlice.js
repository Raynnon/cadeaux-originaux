import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMenuItem: "PRODUITS"
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeSelectedMenuItem: (state, action) => {
      state.selectedMenuItem = action.payload;
    }
  }
});

export const { changeSelectedMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
