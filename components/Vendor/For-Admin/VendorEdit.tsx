"use client";
import { useGetVendorDetailsQuery } from "@/Redux/vendor/vendorApi";
import { LoaderCircle } from "lucide-react";
import React, { FC } from "react";
import VendorCategory from "./VendorCategory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { setActiveVendorDetails } from "@/Redux/vendor/venderDetailsPageSlice";
import VendorInfoEdit from "./VendorDetailsWithCategories";

interface Props {
  vendorId: string;
}

const VendorEdit: FC<Props> = ({ vendorId }) => {
  const { active } = useSelector(
    (state: RootState) => state.venderDetailsPageSlice
  );
  const { data, isLoading, isError } = useGetVendorDetailsQuery(vendorId);

  const dispatch = useDispatch();
  const setActive = (index: number) => {
    dispatch(setActiveVendorDetails(index));
  };

  if (isLoading)
    return (
      <div className='w-full mt-40 flex items-center justify-center text-center'>
        <LoaderCircle className='animate-spin mx-auto' />
      </div>
    );

  if (isError || data.length === 0) {
    return (
      <div className='w-full mt-40 flex items-center justify-center text-center'>
        <h1 className='text-red-500 text-xl'>Data not available</h1>
      </div>
    );
  }

  // const user: IUserInfo = data?.vendorDetails?.user;

  return (
    <div className='my-10 mx-auto max-w-[60rem]'>
      <div className='mx-16  flex my-10 gap-2 flex-col items-center justify-center relative'>
        <h1 className='text-3xl text-gray-900 font-semibold'>
          Edit Vendor Details
        </h1>
        <p className='text-gray-700'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          similique.
        </p>

        {/* <Button
          className='absolute left-0 top-0 bg-blue-200 text-gray-900'
          onClick={() => router.push(`/admin/vendors/edit/${vendorId}`)}>
          <ArrowLeft className='size' />
        </Button> */}
      </div>
      <div className='flex bg-card-darker1 flex-col rounded-lg'>
        <div className='mx-4 border-b pt-2 flex items-center gap-8 font-medium text-gray-700'>
          <button
            className={` py-4 px-6 ${
              active === 0
                ? "border-b-[0.15rem] font-semibold border-gray-400"
                : ""
            }
              `}
            onClick={() => setActive(0)}>
            Information
          </button>
          {data && data?.category?.is_sub_category !== true ? (
            <button
              className={`py-4 px-6 ${
                active === 1 ? "border-b-[0.15rem] border-gray-600" : ""
              }
                `}
              onClick={() => setActive(1)}>
              Category
            </button>
          ) : null}
        </div>

        <div>
          {active === 0 ? (
            <VendorInfoEdit
              data={data}
              vendorId={vendorId}
            />
          ) : null}
          {active === 1 ? <VendorCategory id={vendorId} /> : null}
        </div>
      </div>
    </div>
  );
};

export default VendorEdit;
