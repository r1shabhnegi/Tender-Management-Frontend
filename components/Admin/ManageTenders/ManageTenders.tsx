"use client";
import React, { useEffect, useState } from "react";
import ManageTendersNavbar from "./ManageTendersNavbar";
import { useGetTendersQuery } from "@/Redux/tender/tenderApi";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import {
  Edit,
  LoaderCircle,
  Text,
  Eye,
  Archive,
  Trash,
  Download,
  CheckCircle2,
} from "lucide-react";
import TenderCard from "@/components/Tender/TenderCard";
import { usePathname, useRouter } from "next/navigation";
import AdminPagesWrapper from "../AdminPagesWrapper";
import { ITenderCard } from "@/app/Types/Tender-Types";
import { Button } from "@/components/ui/button";

const ManageTenders = () => {
  const { tenderSearchQueryAdmin, tenderStatusAdmin } = useSelector(
    (state: RootState) => state.tenderSlice
  );
  const router = useRouter();

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
      <div className='container py-6 space-y-6'>
        <h1 className='text-3xl font-bold'>Manage Tenders</h1>

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
          <div className='bg-zinc-5 pt- mt-'>
            <div className='flex flex-col gap-5 mb-10'>
              {data?.tenders?.map((tender: ITenderCard) => (
                <div
                  className='relative max-w-[55rem]'
                  key={tender.id}>
                  <TenderCard tender={tender} />
                  {role === "admin" && pathname?.startsWith("/admin") ? (
                    <div className='absolute top-2 right-0 flex flex-col gap-2 -mr-28 z-10'>
                      {tender.status === "live" ? (
                        <>
                          <span className='absolute bg-green-100 border-green-200 border text-[0.75rem] rounded-tl-xl text-green-800 rounded px-2 -left-[56rem] top-0'>
                            Published
                          </span>

                          <Button
                            onClick={() =>
                              router.push(`/admin/tenders/edit/${tender?.id}`)
                            }
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'>
                            <Edit className='size-3.5' /> Edit
                          </Button>

                          <Button
                            onClick={() =>
                              router.push(`/admin/tenders/view/${tender?.id}`)
                            }
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-blue-50 text-indigo-700 border border-indigo-200 shadow-sm'>
                            <Eye className='size-3.5' /> View
                          </Button>

                          <Button
                            onClick={() =>
                              router.push(`/admin/tenders/bids/${tender?.id}`)
                            }
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-blue-50 text-purple-700 border border-purple-200 shadow-sm'>
                            <Text className='size-3.5' /> Bids
                          </Button>

                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 shadow-sm'>
                            <Archive className='size-3.5' /> Archive
                          </Button>
                        </>
                      ) : null}

                      {tender.status === "draft" ? (
                        <>
                          <span className='absolute bg-orange-100 border-orange-200 border text-[0.75rem] rounded-tl-xl text-orange-800 rounded px-2 -left-[55rem] top-0'>
                            Saved
                          </span>

                          <Button
                            onClick={() =>
                              router.push(`/admin/tenders/edit/${tender?.id}`)
                            }
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'>
                            <Edit className='size-3.5' /> Edit
                          </Button>

                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-green-50 text-green-700 border border-green-200 shadow-sm'>
                            <CheckCircle2 className='size-3.5' /> Publish
                          </Button>

                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 shadow-sm'>
                            <Download className='size-3.5' /> Save as Template
                          </Button>

                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-red-50 text-red-700 border border-red-200 shadow-sm'>
                            <Trash className='size-3.5' /> Delete
                          </Button>
                        </>
                      ) : null}

                      {tender.status === "archived" && (
                        <>
                          <span className='absolute bg-gray-100 border-gray-200 border text-[0.75rem] rounded-tl-xl text-gray-800 rounded px-2 -left-[55rem] top-0'>
                            Archived
                          </span>

                          <Button
                            onClick={() =>
                              router.push(`/admin/tenders/view/${tender?.id}`)
                            }
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-blue-50 text-indigo-700 border border-indigo-200 shadow-sm'>
                            <Eye className='size-3.5' /> View
                          </Button>

                          <Button
                            onClick={() =>
                              router.push(`/admin/tenders/bids/${tender?.id}`)
                            }
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-blue-50 text-purple-700 border border-purple-200 shadow-sm'>
                            <Text className='size-3.5' /> Bids
                          </Button>

                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 bg-white hover:bg-green-50 text-green-700 border border-green-200 shadow-sm'>
                            <CheckCircle2 className='size-3.5' /> Restore
                          </Button>
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </AdminPagesWrapper>
  );
};

export default ManageTenders;
