import { api } from "../api";

const tenderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTender: builder.mutation({
      query: (data) => ({
        url: "/tender/create-tender",
        method: "POST",
        body: data,
      }),
    }),

    getLiveTenders: builder.query({
      query: (search) => ({
        url: `/tender/live/?query=${search}`,
        method: "GET",
      }),
    }),

    getTenders: builder.query({
      query: ({ status, search }) => ({
        url: `/tender/all/?status=${status}&query=${search}`,
        method: "GET",
      }),
    }),

    getSingleTender: builder.query({
      query: (id) => ({
        url: `/tender/single/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTenderMutation,
  useGetTendersQuery,
  useGetLiveTendersQuery,
  useGetSingleTenderQuery,
} = tenderApi;

export default tenderApi.reducer;
