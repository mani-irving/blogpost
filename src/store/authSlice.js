import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      state.isLoggedIn = true;
      state.currentUser = user;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
