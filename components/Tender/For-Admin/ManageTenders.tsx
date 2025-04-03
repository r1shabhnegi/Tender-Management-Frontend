"use client";
import React, { useEffect, useState } from "react";
import ManageTendersActionBar from "@/components/Tender/For-Admin/ManageTendersActionBar";
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
  ClipboardList,
  AlertCircle,
  SearchX,
} from "lucide-react";
import TenderCard from "@/components/Tender/TenderCard";
import { usePathname, useRouter } from "next/navigation";
import AdminPagesWrapper from "@/components/Admin/AdminPagesWrapper";
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

  const getStatusCount = (status: string) => {
    if (!data?.tenders) return 0;
    return data.tenders.filter(
      (tender: ITenderCard) => tender.status === status
    ).length;
  };

  return (
    <AdminPagesWrapper>
      <div className='w-full bg-white border- mb-8'>
        <div className='container mx-auto px-6 py-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Manage Tenders</h1>
          <p className='text-gray-600 mt-2 max-w-2xl'>
            Review, edit and track all tenders in one place. Use the filters
            below to find specific tenders.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-6 space-y-6 mb-12'>
        {/* <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-4 bg-gray-50 border-b'>
            <h2 className='font-semibold text-gray-900'>Tender Filters</h2>
          </div>
          <div className='p-4'> */}
        <ManageTendersActionBar />
        {/* </div>
        </div> */}

        {isLoading ? (
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-20 flex flex-col items-center justify-center'>
            <LoaderCircle
              className='animate-spin mb-4 text-primary'
              size={36}
            />
            <p className='text-gray-500'>Loading tenders...</p>
          </div>
        ) : data?.tenders?.length === 0 ? (
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-20 flex flex-col items-center justify-center'>
            <SearchX
              className='mb-4 text-gray-400'
              size={48}
            />
            <h3 className='text-gray-700 font-medium text-lg mb-1'>
              No tenders found
            </h3>
            <p className='text-gray-500'>
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex border-b border-gray-100  pb-5 max-w-[55rem] items-center justify-between'>
              <div className='flex gap-4'>
                <div className='text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center'>
                  <ClipboardList
                    className='mr-1.5'
                    size={14}
                  />
                  Total: {data?.tenders?.length || 0}
                </div>
                {getStatusCount("live") > 0 && (
                  <div className='text-sm px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 flex items-center'>
                    <CheckCircle2
                      className='mr-1.5'
                      size={14}
                    />
                    Published: {getStatusCount("live")}
                  </div>
                )}
                {getStatusCount("draft") > 0 && (
                  <div className='text-sm px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 flex items-center'>
                    <AlertCircle
                      className='mr-1.5'
                      size={14}
                    />
                    Drafts: {getStatusCount("draft")}
                  </div>
                )}
                {getStatusCount("archived") > 0 && (
                  <div className='text-sm px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200 flex items-center'>
                    <Archive
                      className='mr-1.5'
                      size={14}
                    />
                    Archived: {getStatusCount("archived")}
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col gap-5'>
              {data?.tenders?.map((tender: ITenderCard) => (
                <div
                  className='relative'
                  key={tender.id}>
                  <div className='bg-white border-gray-100 overflow-hidden'>
                    <TenderCard tender={tender} />
                    {role === "admin" && pathname?.startsWith("/admin") && (
                      <div className='absolute top-8 right-2 flex flex-col gap-2 z-10'>
                        {tender.status === "live" && (
                          <>
                            <div className='absolute -top-8 right-12 transform -translate-x-full -translate-y-1/2 bg-green-100 border border-green-200 text-[0.75rem] rounded text-green-800 px-2 py-1 flex items-center'>
                              <CheckCircle2
                                size={12}
                                className='mr-1'
                              />{" "}
                              Published
                            </div>

                            <div className='flex flex-col gap-2'>
                              <Button
                                onClick={() =>
                                  router.push(
                                    `/admin/tenders/edit/${tender?.id}`
                                  )
                                }
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200'>
                                <Edit className='size-3.5' /> Edit
                              </Button>

                              <Button
                                onClick={() =>
                                  router.push(
                                    `/admin/tenders/view/${tender?.id}`
                                  )
                                }
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200'>
                                <Eye className='size-3.5' /> View
                              </Button>

                              <Button
                                onClick={() =>
                                  router.push(
                                    `/admin/tenders/bids/${tender?.id}`
                                  )
                                }
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200'>
                                <Text className='size-3.5' /> Bids
                              </Button>

                              <Button
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-700 border border-amber-200'>
                                <Archive className='size-3.5' /> Archive
                              </Button>
                            </div>
                          </>
                        )}

                        {tender.status === "draft" && (
                          <>
                            <div className='absolute -top-8 right-16 transform -translate-x-full -translate-y-1/2 bg-orange-100 border border-orange-200 text-[0.75rem] rounded text-orange-800 px-2 py-1 flex items-center'>
                              <AlertCircle
                                size={12}
                                className='mr-1'
                              />{" "}
                              Draft
                            </div>

                            <div className='flex flex-col gap-2'>
                              <Button
                                onClick={() =>
                                  router.push(
                                    `/admin/tenders/edit/${tender?.id}`
                                  )
                                }
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200'>
                                <Edit className='size-3.5' /> Edit
                              </Button>

                              <Button
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-green-50 text-green-700 border border-green-200'>
                                <CheckCircle2 className='size-3.5' /> Publish
                              </Button>

                              <Button
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-700 border border-amber-200'>
                                <Download className='size-3.5' /> Template
                              </Button>

                              <Button
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-red-50 text-red-700 border border-red-200'>
                                <Trash className='size-3.5' /> Delete
                              </Button>
                            </div>
                          </>
                        )}

                        {tender.status === "archived" && (
                          <>
                            <div className='absolute -top-8 right-16 transform -translate-x-full -translate-y-1/2 bg-gray-100 border border-gray-200 text-[0.75rem] rounded text-gray-800 px-2 py-1 flex items-center'>
                              <Archive
                                size={12}
                                className='mr-1'
                              />{" "}
                              Archived
                            </div>

                            <div className='flex flex-col gap-2'>
                              <Button
                                onClick={() =>
                                  router.push(
                                    `/admin/tenders/view/${tender?.id}`
                                  )
                                }
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200'>
                                <Eye className='size-3.5' /> View
                              </Button>

                              <Button
                                onClick={() =>
                                  router.push(
                                    `/admin/tenders/bids/${tender?.id}`
                                  )
                                }
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200'>
                                <Text className='size-3.5' /> Bids
                              </Button>

                              <Button
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 bg-white hover:bg-green-50 text-green-700 border border-green-200'>
                                <CheckCircle2 className='size-3.5' /> Restore
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminPagesWrapper>
  );
};

export default ManageTenders;
