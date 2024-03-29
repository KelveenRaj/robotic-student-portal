import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken } from "./slices/app";
import { jsonParseFromStorage } from "../utils/helper";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().app?.accessToken ?? "";
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if token is unauthorized
  if (result?.error?.originalStatus === 401) {
    const token = jsonParseFromStorage("token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", {
      ...extraOptions,
      headers: {
        ...extraOptions?.headers,
        authorization: `Bearer ${token?.refreshToken}`,
      },
    });
    if (refreshResult?.data) {
      // store the new token
      localStorage.setItem("token", JSON.stringify(refreshResult.data));
      api.dispatch(setAccessToken({ ...refreshResult.data }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("token");
    }
  }

  return result;
};

export const baseApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => {
    return {};
  },
});
