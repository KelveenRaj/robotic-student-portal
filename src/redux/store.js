import { configureStore } from "@reduxjs/toolkit";

import { baseApiSlice } from "./createAppApi";
import appReducer from "./slices/app";
import achievementsReducer from "./slices/achievements";

const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    app: appReducer,
    achievements: achievementsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: true,
});

export default store;
