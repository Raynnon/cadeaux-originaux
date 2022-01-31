import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: ""
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const { changeToken } = loginSlice.actions;
export default loginSlice.reducer;
