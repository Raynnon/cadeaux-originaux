import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
  _id: string;
  parent: string[];
  name: string;
  imagesFolder: "string";
}

interface CategoriesAPI {
  Fête: Category[];
  Genre: Category[];
  Occasion: Category[];
  Type: Category[];
}

interface Categories {
  categories: CategoriesAPI;
  loading: boolean;
}

const initialState: Categories = {
  categories: { Fête: [], Genre: [], Occasion: [], Type: [] },
  loading: false
};

const fetchCategories: any = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const response = await axios.get(
      "http://localhost:4000/categories/?ordered=true"
    );

    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, payload: CategoriesAPI) => {
      state.loading = false;
      state.categories = payload;
    },
    [fetchCategories.rejected]: (state) => {
      state.loading = false;
    }
  }
});

export default categoriesSlice.reducer;
