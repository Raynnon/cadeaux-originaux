import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: { Fête: [], Genre: [], Occasion: [], Type: [] },
  loading: false
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(
      "http://localhost:4000/categories/?ordered=true"
    );

    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, payload) => {
      state.loading = false;
      state.categories = payload;
    },
    [fetchCategories.rejected]: (state) => {
      state.loading = false;
    }
  }
});

export default categoriesSlice.reducer;
