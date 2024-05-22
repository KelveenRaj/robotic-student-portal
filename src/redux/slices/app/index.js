import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    saveUserData(state, action) {
      state.userData = action.payload;
    },
    resetUserData(state) {
      state.userData = null;
    },
    resetApp(state) {
      state.userData = null;
      localStorage.removeItem("token");
    },
  },
});

export const { saveUserData, resetUserData, resetApp } = appSlice.actions;
export default appSlice.reducer;
