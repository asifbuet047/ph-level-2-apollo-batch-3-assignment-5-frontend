import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "bikeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  keepUnusedDataFor: 300,
  endpoints: () => {
    return {};
  },
});

//  https://ph-level-2-apollo-batch-3-assignment-3.vercel.app/api/