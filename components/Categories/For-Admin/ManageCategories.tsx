"use client";
import { Button } from "@/components/ui/button";
import {
  useDeleteCategoriesMutation,
  useGetCategoriesQuery,
} from "@/Redux/category/categoryApi";
import { LoaderCircle, Trash, FolderTree, Plus, SearchX } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import CategoriesTable from "@/components/Categories/For-Admin/CategoriesTable";
import { toast } from "sonner";
import AdminPagesWrapper from "../../Admin/AdminPagesWrapper";
import PageError from "@/components/Shared/PageError";

const ManageCategories = () => {
  const [isCategoryDelete, setIsCategoryDelete] = useState<string[]>([]);
  const { data, isLoading, isError } = useGetCategoriesQuery({});
  const [deleteCategories, { isLoading: deletingMultiple }] =
    useDeleteCategoriesMutation();

  async function handleDeleteCategories() {
    try {
      const deleted = await deleteCategories(isCategoryDelete).unwrap();
      if (deleted.success) {
        toast.success("Categories Deleted Successfully");
        setIsCategoryDelete([]);
      }
    } catch {
      toast.error("Error Deleting Categories");
    }
  }

  if (isError) {
    return <PageError message='Error fetching categories' />;
  }

  return (
    <AdminPagesWrapper>
      <div className='w-full bg-white shadow-sm border-b mb-8'>
        <div className='container mx-auto px-6 py-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Manage Categories
          </h1>
          <p className='text-gray-600 mt-2 max-w-2xl'>
            Organize your tenders by creating and managing categories. These
            categories help vendors find relevant tenders more easily.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-6 space-y-6 mb-12'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-4 bg-gray-50 border-b flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <FolderTree
                size={18}
                className='text-primary'
              />
              <h2 className='font-semibold text-gray-900'>Tender Categories</h2>
            </div>
            <div className='flex items-center gap-3'>
              {isCategoryDelete.length > 0 && (
                <Button
                  className='flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white'
                  onClick={handleDeleteCategories}
                  disabled={deletingMultiple}>
                  {deletingMultiple ? (
                    <LoaderCircle className='animate-spin size-4' />
                  ) : (
                    <Trash className='size-4' />
                  )}
                  Delete Selected ({isCategoryDelete.length})
                </Button>
              )}
              <Link href='/admin/categories/add'>
                <Button className='flex items-center gap-2 bg-primary hover:bg-primary/90 text-white'>
                  <Plus className='size-4' />
                  Add New Category
                </Button>
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className='bg-white p-20 flex flex-col items-center justify-center'>
              <LoaderCircle
                className='animate-spin mb-4 text-primary'
                size={36}
              />
              <p className='text-gray-500'>Loading categories...</p>
            </div>
          ) : data?.categories?.length ? (
            <div className='p-0'>
              <CategoriesTable
                data={data}
                setIsCategoryDelete={setIsCategoryDelete}
                isCategoryDelete={isCategoryDelete}
              />
            </div>
          ) : (
            <div className='bg-white p-20 flex flex-col items-center justify-center'>
              <SearchX
                className='mb-4 text-gray-400'
                size={48}
              />
              <h3 className='text-gray-700 font-medium text-lg mb-1'>
                No categories found
              </h3>
              <p className='text-gray-500'>
                Get started by creating your first category
              </p>
              <Link
                href='/admin/categories/add'
                className='mt-4'>
                <Button className='flex items-center gap-2 bg-primary hover:bg-primary/90 text-white'>
                  <Plus className='size-4' />
                  Add New Category
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminPagesWrapper>
  );
};

export default ManageCategories;
