"use client";
import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus, FilePenLine, LoaderCircle, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetVendorCategoriesQuery } from "@/Redux/category/categoryApi";
import { IVenderCategoryTable } from "@/app/Types/Category-Types";
import { format } from "date-fns";
import { capitalizeFirstLetter } from "@/lib/helper";

interface Props {
  id: string;
}
const VendorCategory: FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetVendorCategoriesQuery(id);

  if (isLoading)
    return (
      <div className='w-full mt-40 flex items-center justify-center text-center'>
        <LoaderCircle className='animate-spin mx-auto' />
      </div>
    );

  return (
    <div className='bg-gray-50 p-5 rounded-lg'>
      <div className='flex justify-end border-b pb-5 mb-1'>
        <Link href={`/admin/vendors/category/add/${id}`}>
          <Button className='bg-blue-200 text-gray-900 rounded-lg font-semibold hover:bg-blue-300 transition-colors duration-300'>
            <CirclePlus />
            Add
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires At</TableHead>
            <TableHead className='text-center'>Edit</TableHead>
            <TableHead className='text-center'>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.vendorCategories.map((category: IVenderCategoryTable) => (
            <TableRow key={category.id}>
              <TableCell className=' font-medium'>
                {capitalizeFirstLetter(category.category)}
              </TableCell>
              <TableCell className=''>{category.status}</TableCell>
              <TableCell>{format(category.expires_at, "dd-MM-yyyy")}</TableCell>

              <TableCell className='w-28 cursor-pointer text-gray-700  hover:text-blue-600'>
                <Link
                  href={`/admin/vendors/category/info/${id}/${category?.id}`}>
                  <FilePenLine className='rounded-sm bg-blue-50 hover:bg-blue-100  p-0.5 h-6 w-10 mx-auto' />
                </Link>
              </TableCell>
              <TableCell className='w-28 cursor-pointer text-gray-700  hover:text-red-600'>
                <Trash className='rounded-sm bg-red-50 hover:bg-red-100  p-0.5 h-6 w-10 mx-auto' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VendorCategory;
