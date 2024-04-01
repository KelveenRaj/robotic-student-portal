import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().app?.accessToken ?? "";
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseApiSlice = createApi({
  baseQuery,
  endpoints: () => {
    return {};
  },
});
