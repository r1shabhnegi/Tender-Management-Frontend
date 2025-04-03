"use client";
import React from "react";
import { useGetVendorsQuery } from "@/Redux/vendor/vendorApi";
import VendorsTable from "./VendorsTable";
import PageLoading from "@/components/Shared/PageLoading";
import AdminPagesWrapper from "@/components/Admin/AdminPagesWrapper";
import PageError from "@/components/Shared/PageError";
import { Building, Users, SearchX } from "lucide-react";

const ManageVendors = () => {
  const { data, isLoading, isError } = useGetVendorsQuery({});

  if (isLoading) return <PageLoading />;

  if (isError) {
    return <PageError message='Error fetching vendors' />;
  }

  return (
    <AdminPagesWrapper>
      <div className='w-full bg-white shadow-sm border-b mb-8'>
        <div className='container mx-auto px-6 py-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Manage Vendors</h1>
          <p className='text-gray-600 mt-2 max-w-2xl'>
            View and manage all registered vendors in one place. Review vendor
            information, track their status, and manage their accounts.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-6 space-y-6 mb-12'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-4 bg-gray-50 border-b flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Users
                size={18}
                className='text-primary'
              />
              <h2 className='font-semibold text-gray-900'>
                Registered Vendors
              </h2>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <Building
                size={16}
                className='text-gray-400'
              />
              <span>Total Vendors: {data?.vendors?.length || 0}</span>
            </div>
          </div>

          {data?.vendors?.length ? (
            <div className='p-0'>
              <VendorsTable data={data} />
            </div>
          ) : (
            <div className='bg-white p-20 flex flex-col items-center justify-center'>
              <SearchX
                className='mb-4 text-gray-400'
                size={48}
              />
              <h3 className='text-gray-700 font-medium text-lg mb-1'>
                No vendors found
              </h3>
              <p className='text-gray-500'>
                There are currently no registered vendors in the system
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminPagesWrapper>
  );
};

export default ManageVendors;
