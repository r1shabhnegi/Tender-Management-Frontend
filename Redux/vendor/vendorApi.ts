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
  }),
});

export const {
  useGetVendorsQuery,
  useGetVendorDetailsQuery,
  useUploadVendorByAdminMutation,
  useGetCategoryVendorsQuery,
} = vendorApi;
