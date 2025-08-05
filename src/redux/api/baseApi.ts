import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      // Add auth headers if needed
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Book", "Borrow"],
});
