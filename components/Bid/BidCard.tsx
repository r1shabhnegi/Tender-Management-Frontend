"use client";
import { format, formatDistanceToNow } from "date-fns";
import { Star, Building2, FileCheck, Calendar, Award } from "lucide-react";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/helper";
import { Button } from "../ui/button";
import { IconRight } from "react-day-picker";
import { IBidCard } from "@/app/Types/Bid-Types";
import { FC } from "react";

interface Props {
  bid: IBidCard;
  tenderId: string;
}

export const BidCard: FC<Props> = ({ bid, tenderId }) => {
  const formattedDate = formatDistanceToNow(new Date(bid.created_at), {
    addSuffix: true,
  });

  console.log(bid);

  // Calculate the average score if both scores exist
  const hasScores =
    bid.technical_score !== undefined && bid.financial_score !== undefined;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-700";
      case "pending":
        return "text-yellow-700";
      case "rejected":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className='group relative rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'>
      {/* Status Badge */}
      <div className='absolute bg-gray-50 border-gray-200 border px-1 rounded-full top-1 left-1'>
        <span
          className={`text-xs font-medium rounded-full ${getStatusColor(
            bid.status
          )} flex items-center gap-1.5`}>
          <span className='w-2 h-2 rounded-full bg-current'></span>
          {capitalizeFirstLetter(bid.status)}
        </span>
      </div>

      {/* Header Section */}
      <div className='p-6 pb-4 mt-1'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-3'>
              <Building2 className='h-4 w-4 text-gray-500' />
              <h3 className='text-lg font-semibold text-gray-900 truncate'>
                {bid.business_name || "Business Name"}
              </h3>
            </div>
            <p className='text-sm text-gray-600 mb-2'>
              {bid.business_classification || "Business Classification"}
            </p>
            <span className='text-xs text-gray-500 flex items-center gap-1'>
              <Calendar className='h-3 w-3' />
              {capitalizeFirstLetter(formattedDate)}
            </span>
          </div>
          {hasScores && (
            <div className='flex flex-col items-center bg-primary/10 rounded-lg px-3 py-2'>
              <Star className='h-4 w-4 text-yellow-400 fill-yellow-400 mb-1' />
              <span className='text-sm font-semibold text-primary'>
                {Number(bid?.total_score)?.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className='px-6 py-4 bg-gray-50/50 border-t border-gray-100'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-start gap-2'>
            <FileCheck className='h-4 w-4 text-gray-500 mt-0.5' />
            <div>
              <p className='text-xs text-gray-500'>DD Number</p>
              <p className='text-sm font-medium text-gray-900'>
                {bid.dd_number}
              </p>
            </div>
          </div>
          <div className='flex items-start gap-2'>
            <Calendar className='h-4 w-4 text-gray-500 mt-0.5' />
            <div>
              <p className='text-xs text-gray-500'>DD Date</p>
              <p className='text-sm font-medium text-gray-900'>
                {format(bid.dd_date, "dd/MM/yyyy")}
              </p>
            </div>
          </div>
        </div>

        {hasScores && (
          <div className='mt-4 grid grid-cols-2 gap-4'>
            <div className='flex items-start gap-2'>
              <Award className='h-4 w-4 text-gray-500 mt-0.5' />
              <div>
                <p className='text-xs text-gray-500'>Technical Score</p>
                <div className='flex items-center mt-1'>
                  <Star className='h-3 w-3 text-yellow-500 fill-yellow-500 mr-1' />
                  <p className='text-sm font-medium text-gray-900'>
                    {Math.abs(bid.technical_score)}/5
                  </p>
                </div>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <Award className='h-4 w-4 text-gray-500 mt-0.5' />
              <div>
                <p className='text-xs text-gray-500'>Financial Score</p>
                <div className='flex items-center mt-1'>
                  <Star className='h-3 w-3 text-yellow-500 fill-yellow-500 mr-1' />
                  <p className='text-sm font-medium text-gray-900'>
                    {Math.abs(bid.financial_score)}/5
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className='p-6 pt-4'>
        <Link
          href={`/admin/tenders/bids/details/${tenderId}/${bid.id}`}
          className='block w-full'>
          <Button className='w-full bg-primary hover:bg-primary-2 text-white font-medium transition-colors duration-200'>
            View Details
            <IconRight className='ml-2 h-4 w-4' />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BidCard;
