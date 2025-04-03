import { api } from "../api";

const bidApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBid: builder.mutation({
      query: (data) => ({
        url: `/bid/create`,
        method: "POST",
        body: data,
      }),
    }),

    getTenderBids: builder.query({
      query: (tenderId) => ({
        url: `/bid/tender-bids/${tenderId}`,
        method: "GET",
      }),
    }),

    getBidById: builder.query({
      query: (bidId) => ({
        url: `/bid/details/${bidId}`,
        method: "GET",
      }),
    }),

    updateBidScore: builder.mutation({
      query: ({ bidId, technicalScore, financialScore }) => ({
        url: `/bid/update-score/${bidId}`,
        method: "PATCH",
        body: { technicalScore, financialScore },
      }),
      invalidatesTags: ["bids"],
    }),
  }),
});

export const {
  useCreateBidMutation,
  useGetBidByIdQuery,
  useGetTenderBidsQuery,
  useUpdateBidScoreMutation,
} = bidApi;
