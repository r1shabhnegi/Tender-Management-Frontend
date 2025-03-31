import { api } from "../api";

const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query({
      query: () => ({
        url: "/vendor/all",
        method: "GET",
      }),
      providesTags: ["get_vendors"],
    }),
    getVendorDetails: builder.query({
      query: (id) => ({
        url: `/vendor/details/${id}`,
        method: "GET",
      }),
      providesTags: ["get_vendor_details"],
    }),

    getCategoryVendors: builder.query({
      query: (id) => ({
        url: `/vendor/category/${id}`,
        method: "GET",
      }),
      // providesTags: ["get_category_vendors"],
    }),

    uploadVendorByAdmin: builder.mutation({
      query: (data) => ({
        url: "/vendor/vendor-update-by-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get_vendor_details", "get_vendors"],
    }),

    // Get vendor dashboard statistics
    getVendorDashboardStats: builder.query({
      query: () => ({
        url: "/vendor/dashboard/stats",
        method: "GET",
      }),
    }),

    // Get purchased tenders
    getVendorPurchasedTenders: builder.query({
      query: () => ({
        url: "/vendor/dashboard/purchased-tenders",
        method: "GET",
      }),
    }),

    // Get qualified tenders
    getVendorQualifiedTenders: builder.query({
      query: () => ({
        url: "/vendor/dashboard/qualified-tenders",
        method: "GET",
      }),
    }),

    // Get participated tenders
    getVendorParticipatedTenders: builder.query({
      query: () => ({
        url: "/vendor/dashboard/participated-tenders",
        method: "GET",
      }),
    }),

    // Get vendor bids
    getVendorBids: builder.query({
      query: () => ({
        url: "/vendor/dashboard/bids",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetVendorsQuery,
  useGetVendorDetailsQuery,
  useUploadVendorByAdminMutation,
  useGetCategoryVendorsQuery,
  useGetVendorDashboardStatsQuery,
  useGetVendorPurchasedTendersQuery,
  useGetVendorQualifiedTendersQuery,
  useGetVendorParticipatedTendersQuery,
  useGetVendorBidsQuery,
} = vendorApi;
