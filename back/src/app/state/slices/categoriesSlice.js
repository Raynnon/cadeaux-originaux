import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: {},
  loading: false
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/categories/?ordered=true`
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
      state.categories = payload.payload;
    },
    [fetchCategories.rejected]: (state) => {
      state.loading = false;
    }
  }
});

export default categoriesSlice.reducer;
