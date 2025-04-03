import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { capitalizeFirstLetter } from "@/lib/helper";
import { IVendorsTable } from "@/app/Types/Vender-Types";

interface Props {
  data: { vendors: IVendorsTable[] };
}

const VendorsTable: FC<Props> = ({ data }) => {
  return (
    <div className='bg-card p-5 rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Status</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Company Type</TableHead>
            <TableHead>City</TableHead>
            <TableHead className='text-center'>Details</TableHead>
            <TableHead className='text-center'>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.vendors?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className='text-center text-red-600'>
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data?.vendors?.map((vendor: IVendorsTable) => (
              <TableRow
                key={vendor.email}
                className='my-4'>
                {/* <TableCell>
                <Checkbox
                  onCheckedChange={(val) => {
                    if (val) {
                      setIsVendorDelete([...isVendorDelete, vendor.id]);
                    }
                    if (!val) {
                      const arr = isVendorDelete.filter(
                        (id) => id !== vendor.id
                      );
                      setIsVendorDelete(arr);
                    }
                  }}
                />
              </TableCell> */}
                <TableCell>
                  <span
                    className={`font-medium border-[0.1rem] rounded-sm text-[0.8rem] py-0.5 px-2 ${
                      vendor && vendor.status === "pending"
                        ? "bg-orange-100  text-orange-700 border-orange-200"
                        : vendor.status === "approved"
                        ? "bg-green-100  text-green-700 border-green-200"
                        : vendor.status === "rejected"
                        ? "bg-red-100  text-red-700 border-red-200"
                        : ""
                    }`}>
                    {capitalizeFirstLetter(vendor.status)}
                  </span>
                </TableCell>
                <TableCell className='text-gray-900'>
                  {capitalizeFirstLetter(vendor.fullname)}
                </TableCell>
                <TableCell className='text-gray-900'>{vendor.email}</TableCell>
                <TableCell className='text-gray-900'>
                  {vendor.businessName}
                </TableCell>
                <TableCell className='text-gray-900'>
                  {vendor.businessClassification}
                </TableCell>
                <TableCell className='text-gray-900'>
                  {capitalizeFirstLetter(vendor.city)}
                </TableCell>

                <TableCell className='text-gray-700 hover:text-blue-600 cursor-pointer'>
                  {/* <ViewVendorDialog id={vendor?.id} /> */}
                  <Link
                    href={`/admin/vendors/${vendor.id}`}
                    className='cursor-pointer text-gray-700  hover:text-blue-600'>
                    <Eye className='rounded-sm bg-blue-100  transition-all duration-300 hover:bg-blue-200  p-1 h-7 w-12 mx-auto' />
                  </Link>
                </TableCell>

                <TableCell className='text-gray-700 hover:text-blue-600 cursor-pointer'>
                  <Link
                    href={`/admin/vendors/edit/${vendor.id}`}
                    className='cursor-pointer text-gray-700  hover:text-blue-600'>
                    <Edit className='rounded-sm bg-blue-100  transition-all duration-300 hover:bg-blue-200  p-1 h-7 w-12 mx-auto' />
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

export default VendorsTable;
