import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setUser, setLogout } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  credentials: "include" as const,
});

const fetchBaseQueryReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error as { data: { Err: number } }).data.Err === 6705
  ) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "GET" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as {
        user: {
          id: string;
          email: string;
          role: string;
        };
      };
      api.dispatch(setUser(data.user));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLogout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQueryReAuth,
  tagTypes: [
    "get_categories",
    "get_categories_names",
    "get_single_category",
    "get_vendors",
    "get_vendor_details",
    "get_vendor_categories",
    "bids",
  ],
  endpoints: (builder) => ({
    getS3File: builder.query({
      query: (fileName: string) => ({
        url: `/s3-files/file-url?fileName=${fileName}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetS3FileQuery } = api;
