import { api } from "../api";

const s3FilesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFileUrl: builder.mutation({
      query: (data) => ({
        url: "/s3-files/file-url",
        method: "GET",
        body: data,
      }),
    }),

    getUploadUrl: builder.mutation({
      query: (data) => ({
        url: "/s3-files/upload-url",
        method: "POST",
        body: data,
      }),
    }),

    deleteFileUrl: builder.mutation({
      query: (data) => ({
        url: "/s3-files/file-url",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUploadUrlMutation,
  useGetFileUrlMutation,
  useDeleteFileUrlMutation,
} = s3FilesApi;
