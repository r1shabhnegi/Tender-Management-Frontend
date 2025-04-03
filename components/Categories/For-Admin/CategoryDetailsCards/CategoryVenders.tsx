import React, { FC } from "react";
import { useGetCategoryVendorsQuery } from "@/Redux/vendor/vendorApi";
import VendorsTable from "@/components/Vendor/For-Admin/VendorsTable";
import { LoaderCircle } from "lucide-react";

interface Props {
  categoryId: string;
}
const CategoryVendors: FC<Props> = ({ categoryId }) => {
  const { data, isLoading, isError } = useGetCategoryVendorsQuery(categoryId);

  console.log(data);

  if (isLoading)
    return (
      <div className='w-full mt-40 flex items-center justify-center text-center'>
        <LoaderCircle className='animate-spin mx-auto' />
      </div>
    );

  if (isError || data?.length === 0) {
    return (
      <div className='w-full my-10 flex items-center justify-center text-center'>
        <h1 className='text-red-500 text-xl'>Data not available</h1>
      </div>
    );
  }

  return (
    <VendorsTable
      data={data}
      // isFromCategoryDetails={true}
      // categoryId={categoryId}
    />
  );
};

export default CategoryVendors;
