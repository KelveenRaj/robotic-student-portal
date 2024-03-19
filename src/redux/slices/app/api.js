import { baseApiSlice } from "../../createAppApi";
const BASE_PATH = "https://dummyjson.com";

export const appApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (data) => ({
          url: `${BASE_PATH}/auth/login`,
          method: "POST",
          body: data,
        }),
      }),
    };
  },
});

export const { useLoginMutation } = appApi;
