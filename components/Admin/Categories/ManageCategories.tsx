"use client";
import { Button } from "@/components/ui/button";
import {
  useDeleteCategoriesMutation,
  useGetCategoriesQuery,
} from "@/Redux/category/categoryApi";
import { CirclePlus, LoaderCircle, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import CategoriesTable from "./CategoriesTable";
import { toast } from "sonner";
import AdminPagesWrapper from "../AdminPagesWrapper";

const ManageCategories = () => {
  const [isCategoryDelete, setIsCategoryDelete] = useState<string[]>([]);
  const { data, isLoading, isError } = useGetCategoriesQuery({});
  const [deleteCategories, { isLoading: deletingMultiple }] =
    useDeleteCategoriesMutation();

  async function handleDeleteCategories() {
    try {
      const deleted = await deleteCategories(isCategoryDelete).unwrap();
      if (deleted.isSuccess) {
        toast.success("Categories Deleted Successfully");
        setIsCategoryDelete([]);
      }
    } catch {
      toast.error("Error Deleting Categories");
    }
  }
  if (isLoading)
    return (
      <div className='w-full mt-40 flex items-center justify-center text-center'>
        <LoaderCircle className='animate-spin mx-auto' />
      </div>
    );

  if (isError) {
    return (
      <div className='w-full mt-40 flex items-center justify-center text-center'>
        <h1 className='text-red-500 text-xl'>Data not available</h1>
      </div>
    );
  }

  return (
    <AdminPagesWrapper>
      <div className='mx-16 flex my-10 gap-2 flex-col items-center justify-center relative'>
        <h1 className='text-3xl text-gray-900 font-semibold'>
          Categories Details
        </h1>
        <p className='text-gray-700'>
          View all information about the categories
        </p>

        {/* <Button
                className='absolute left-0 top-0 bg-blue-200 text-gray-900'
                onClick={() => router.push(`/admin/venders/edit/${venderId}`)}>
                <ArrowLeft className='size' />
              </Button> */}
      </div>
      <div className=' mb-2 mx-2 flex justify-end'>
        <span className='flex items-center gap-5'>
          {isCategoryDelete.length > 0 ? (
            <Button
              className='flex items-center bg-red-600'
              onClick={handleDeleteCategories}>
              {deletingMultiple ? (
                <LoaderCircle className='animate-spin' />
              ) : (
                <Trash className='size-4' />
              )}
              Delete
            </Button>
          ) : null}
          <Link href={"/admin/categories/add"}>
            <Button className='bg-primary hover:bg-primary/70 bg-blue-200 hover:bg-blue-300 text-black'>
              <CirclePlus />
              Add
            </Button>
          </Link>
        </span>
      </div>

      <CategoriesTable
        data={data}
        setIsCategoryDelete={setIsCategoryDelete}
        isCategoryDelete={isCategoryDelete}
      />
    </AdminPagesWrapper>
  );
};

export default ManageCategories;
