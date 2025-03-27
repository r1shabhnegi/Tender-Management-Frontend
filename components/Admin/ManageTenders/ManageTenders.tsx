"use client";
import React, { useEffect, useState } from "react";
import ManageTendersNavbar from "./ManageTendersNavbar";
import { useGetTendersQuery } from "@/Redux/tender/tenderApi";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Edit, LoaderCircle, Text } from "lucide-react";
import TenderCard from "@/components/Tender/TenderCard";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AdminPagesWrapper from "../AdminPagesWrapper";
import { ITenderCard } from "@/app/Types/Tender-Types";

const ManageTenders = () => {
  const { tenderSearchQueryAdmin, tenderStatusAdmin } = useSelector(
    (state: RootState) => state.tenderSlice
  );

  const [queryParams, setQueryParams] = useState({
    status: tenderStatusAdmin,
    search: tenderSearchQueryAdmin,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQueryParams({
        status: tenderStatusAdmin,
        search: tenderSearchQueryAdmin,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [tenderStatusAdmin, tenderSearchQueryAdmin]);
  const pathname = usePathname();

  const { data, isLoading } = useGetTendersQuery(queryParams);
  const {
    user: { role },
  } = useSelector((state: RootState) => state.authSlice);

  return (
    <AdminPagesWrapper>
      <div className=''>
        <div className='mx-16  flex my-10 gap-2 flex-col items-center justify-center relative'>
          <h1 className='text-3xl text-gray-900 font-semibold'>
            Manage Tenders
          </h1>
          <p className='text-gray-700'>
            View all information about the tender and its bids
          </p>
        </div>
        <ManageTendersNavbar />

        {isLoading ? (
          <div className='w-full mt-40 flex items-center justify-center text-center'>
            <LoaderCircle className='animate-spin mx-auto' />
          </div>
        ) : null}

        {data?.tenders?.length === 0 ? (
          <div className='w-full mt-40 flex items-center justify-center text-center'>
            <h1 className='text-red-500 text-xl'>Data not available</h1>
          </div>
        ) : null}

        {data?.tenders?.length > 0 && !isLoading ? (
          <div className=' bg-zinc-5 pt-4 mt-2'>
            <div className='flex flex-col gap-5 mb-10'>
              {data?.tenders?.map((tender: ITenderCard) => (
                <div
                  className='relative max-w-[55rem]'
                  key={tender.id}>
                  <TenderCard tender={tender} />
                  {role === "admin" && pathname?.startsWith("/admin") ? (
                    <>
                      {tender.status === "live" ? (
                        <>
                          <span className='absolute bg-green-100 border-green-200 border text-[0.75rem] rounded-tl-xl text-green-800 rounded px-2 -top-0 -left -0'>
                            Published
                          </span>
                          <span className='cursor-pointer absolute gap-2 font-semibold text-sm flex items-center text-gray-700 hover:text-blue-600 rounded-xl px-2.5 py-0.5 top-2 -right-20 transition-colors duration-300'>
                            <Edit /> Edit
                          </span>
                          <Link href={`/admin/tenders//bids/${tender?.id}`}>
                            <span className='cursor-pointer absolute gap-2 font-semibold text-sm flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300  rounded-xl px-2.5 py-0.5 top-12 -right-20'>
                              <Text /> Bids
                            </span>
                          </Link>
                        </>
                      ) : null}

                      {tender.status === "draft" ? (
                        <>
                          <span className='absolute bg-orange-100 border-orange-200 border text-sm rounded-tl-xl text-[0.75rem] text-orange-800 rounded px-2 top-0 left-0'>
                            Saved
                          </span>
                          <span className='cursor-pointer absolute gap-2 font-semibold text-sm flex items-center text-gray-700 hover:text-blue-600 rounded-xl px-2.5 py-0.5 top-2 -right-[9.1rem] transition-colors duration-300 '>
                            <Edit /> Edit & Publish
                          </span>
                        </>
                      ) : null}
                    </>
                  ) : null}

                  {<></>}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {/* <div></div> */}
      </div>
    </AdminPagesWrapper>
  );
};

export default ManageTenders;
