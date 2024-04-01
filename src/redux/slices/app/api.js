import { baseApiSlice } from "../../createAppApi";

export const appApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getActiveCentres: builder.query({
        query: () => ({
          url: "center?status=Assigned",
        }),
      }),
      getUserData: builder.query({
        query: () => ({
          url: "/user",
        }),
      }),
    };
  },
});

export const { useGetActiveCentresQuery, useGetUserDataQuery } = appApi;
