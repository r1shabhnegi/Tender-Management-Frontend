"use client";
import React from "react";
import { useGetVendorsQuery } from "@/Redux/vendor/vendorApi";
import VendorsTable from "./VendorsTable";
import PageLoading from "@/components/Shared/PageLoading";
import AdminPagesWrapper from "../AdminPagesWrapper";

const ManageVendors = () => {
  const { data, isLoading, isError } = useGetVendorsQuery({});

  if (isLoading) return <PageLoading />;

  if (isError || data?.length === 0) {
    return (
      <div className='w-full mt-40 flex items-center justify-center text-center'>
        <h1 className='text-red-500 text-xl'>Data not available</h1>
      </div>
    );
  }

  return (
    <AdminPagesWrapper>
      <div className='mx-16  flex my-10 gap-2 flex-col items-center justify-center relative'>
        <h1 className='text-3xl text-gray-900 font-semibold'>Manage Vendors</h1>
        <p className='text-gray-700'>
          View all information about the vendor and their business
        </p>

        {/* <Button
                className='absolute left-0 top-0 bg-blue-200 text-gray-900'
                onClick={() => router.push(`/admin/vendors/edit/${vendorId}`)}>
                <ArrowLeft className='size' />
              </Button> */}
      </div>
      {/* <div className='mt-4 mb-2 mx-2 flex justify-between items-center'>
        <span className=' py-2'>
          <h1 className='font-medium text-gray-900 text-xl'>Manage Vendors</h1>
        </span>
        {isVendorDelete.length > 0 ? (
          <Button variant={"destructive"}>Delete</Button>
        ) : null}
      </div> */}
      <VendorsTable data={data} />
    </AdminPagesWrapper>
  );
};

export default ManageVendors;
