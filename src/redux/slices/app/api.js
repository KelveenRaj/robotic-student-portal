import { baseApiSlice } from "../../createAppApi";

export const appApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getActiveCentres: builder.query({
        query: () => ({
          url: "center?status=Assigned",
        }),
      }),
    };
  },
});

export const { useGetActiveCentresQuery } = appApi;
