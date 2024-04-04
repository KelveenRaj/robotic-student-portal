import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userData: {},
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
    },
    saveUserData(state, action) {
      state.userData = action.payload;
    },
    resetUserData(state) {
      state.accessToken = null;
      state.userData = null;
    },
  },
});

export const { setAccessToken, saveUserData, resetUserData } = appSlice.actions;
export default appSlice.reducer;
