"use client";
import { format, formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
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

  // Calculate the average score if both scores exist
  const hasScores =
    bid.technical_score !== undefined && bid.financial_score !== undefined;
  const avgScore = hasScores
    ? ((bid.technical_score || 0) + (bid.financial_score || 0)) / 2
    : undefined;

  return (
    <div className='rounded-xl bg-card-color bg-card p-6'>
      <div className='flex items-start justify-between'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <span className='status-pill text-[0.8rem] bg-green-100 text-green-800 rounded-full px-2 py- border border-green-200 flex items-center gap-1.5'>
              {capitalizeFirstLetter(bid.status)}
            </span>
            <span className='text-xs text-gray-700 font-medium'>
              {capitalizeFirstLetter(formattedDate)}
            </span>
          </div>
          <h3 className='text-lg font-medium'>
            {bid.business_name || "Business Name"}
          </h3>
          <p className='text-sm text-gray-700 mt-1'>
            {bid.business_classification || "Business Classification"}
          </p>
        </div>
        {hasScores && (
          <div className='rounded-full flex items-center bg-blue-100 px-2 py-0.5'>
            <Star className='h-4 w-4 mr-1 text-yellow-400 fill-yellow-400' />
            <span className='text-sm text-gray-900 font-medium'>
              {avgScore?.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className='grid grid-cols-2 gap-4 mt-4'>
        <div>
          <p className='text-xs text-gray-700'>DD Number</p>
          <p className='text-sm font-medium'>{bid.dd_number}</p>
        </div>
        <div>
          <p className='text-xs text-gray-700'>DD Date</p>
          <p className='text-sm font-medium'>{format(bid.dd_date, "PPP")}</p>
        </div>
      </div>

      {hasScores && (
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div>
            <p className='text-xs text-gray-700'>Technical Score</p>
            <div className='flex items-center mt-1'>
              <Star className='h-3 w-3 text-yellow-500 fill-yellow-500 mr-1' />
              <p className='text-sm font-medium'>{bid.technical_score}/5</p>
            </div>
          </div>
          <div>
            <p className='text-xs text-gray-700'>Financial Score</p>
            <div className='flex items-center mt-1'>
              <Star className='h-3 w-3 text-yellow-500 fill-yellow-500 mr-1' />
              <p className='text-sm font-medium'>{bid.financial_score}/5</p>
            </div>
          </div>
        </div>
      )}

      <div className='mt-6 flex justify-end bg-'>
        <Link
          href={`/admin/tenders/bids/details/${tenderId}/${bid.id}`}
          className='w-full'>
          <Button className='mt-4 w-full font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300'>
            View Details
            <IconRight className='size-2 p-0.5' />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BidCard;
