import { baseApiSlice } from "../../createAppApi";

export const appApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getActiveCentres: builder.query({
        query: () => ({
          url: "center?status=Assigned",
        }),
      }),
      studentSignUp: builder.mutation({
        query: (payload) => ({
          url: "/user/student",
          method: "POST",
          body: payload,
        }),
      }),
    };
  },
});

export const { useGetActiveCentresQuery, useStudentSignUpMutation } = appApi;
