import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
  name: string;

  compoId: number;
}

interface Menu {
  selectedMenuItemId: number;
  menuItems: MenuItem[];
}

const initialState: Menu = {
  selectedMenuItemId: 0,
  menuItems: [
    {
      name: "Products list",
      compoId: 0
    },
    { name: "Add product", compoId: 1 }
  ]
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeSelectedItemId: (state, action: PayloadAction<number>) => {
      state.selectedMenuItemId = action.payload;
    }
  }
});

export const { changeSelectedItemId } = menuSlice.actions;
export default menuSlice.reducer;
