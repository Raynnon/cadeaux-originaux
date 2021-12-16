import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMenuItemId: 0,
  menuItems: [
    {
      name: "PRODUCTS LIST",
      compoId: 0
    },
    { name: "ADD PRODUCT", compoId: 1 }
  ]
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeSelectedItemId: (state, action) => {
      state.selectedMenuItemId = action.payload;
    }
  }
});

export const { changeSelectedItemId } = menuSlice.actions;
export default menuSlice.reducer;
