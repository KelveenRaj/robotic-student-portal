import { baseApiSlice } from "../../createAppApi";

export const achievementsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAchievements: builder.query({
        query: () => ({
          url: "/achievements",
        }),
      }),
    };
  },
});

export const { useGetAchievementsQuery } = achievementsApi;
