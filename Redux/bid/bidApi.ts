import { url } from "inspector";
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
  }),
});

export const {
  useCreateBidMutation,
  useGetBidByIdQuery,
  useGetTenderBidsQuery,
} = bidApi;
