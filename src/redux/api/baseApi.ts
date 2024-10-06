import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "bikeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ph-level-2-apollo-batch-3-assignment-3.vercel.app/api/",
  }),
  keepUnusedDataFor: 300,
  endpoints: () => {
    return {};
  },
});
