import React, { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, FilePenLine } from "lucide-react";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/helper";
import { ICategories } from "@/app/Types/Category-Types";

interface Props {
  data: ICategories;
  setIsCategoryDelete: (isVenisCategoryDeletederDelete: string[]) => void;
  isCategoryDelete: string[];
}
const CategoriesTable: FC<Props> = ({
  data,
  isCategoryDelete,
  setIsCategoryDelete,
}) => {
  console.log(data);
  return (
    <div className='bg-card-color shadow p-5 rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Sub Category</TableHead>
            <TableHead>Parent Category</TableHead>
            <TableHead>Scope</TableHead>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead className='w-20 text-center'>Details</TableHead>
            <TableHead className='w-20 text-center'>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className='text-center text-red-600'>
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Checkbox
                    className='border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600'
                    onCheckedChange={(val) => {
                      if (val) {
                        setIsCategoryDelete([...isCategoryDelete, category.id]);
                      }
                      if (!val) {
                        const arr = isCategoryDelete.filter(
                          (id) => id !== category.id
                        );
                        setIsCategoryDelete(arr);
                      }
                    }}
                  />
                </TableCell>
                <TableCell className='font-medium'>
                  {capitalizeFirstLetter(category.name)}
                </TableCell>
                <TableCell className=''>
                  {category.is_sub_category ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  {category.sub_category_main
                    ? category.sub_category_main
                    : "---"}
                </TableCell>
                <TableCell className=''>
                  {capitalizeFirstLetter(category.scope)}
                </TableCell>
                <TableCell className='text-center'>
                  <span
                    className={`font-medium border-[0.1rem] rounded-sm text-[0.8rem] p-0.5 ${
                      category && category.status === "active"
                        ? "bg-green-100  text-green-600 border-green-200"
                        : category.status === "inactive"
                        ? "bg-red-100  text-red-600 border-red-200"
                        : ""
                    }`}>
                    {capitalizeFirstLetter(category.status)}
                  </span>
                </TableCell>
                <TableCell className=' cursor-pointer text-gray-600  hover:text-blue-600'>
                  <Link href={`/admin/categories/${category.id}`}>
                    <Eye className='rounded-sm bg-blue-100  transition-all duration-300 hover:bg-blue-200  p-1 h-7 w-12 mx-auto' />
                  </Link>
                </TableCell>
                <TableCell className='cursor-pointer text-gray-700  hover:text-blue-600'>
                  <Link href={`/admin/categories/edit/${category.id}`}>
                    <FilePenLine className='rounded-sm  transition-all duration-300 bg-blue-100  hover:bg-blue-200  p-1 h-7 w-12 mx-auto' />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesTable;
