"use client";
import { FC } from "react";
import { BidCard } from "./BidCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AdminPagesWrapper from "../Admin/AdminPagesWrapper";
import { useGetTenderBidsQuery } from "@/Redux/bid/bidApi";
import { IBidCard } from "@/app/Types/Bid-Types";

interface TenderBidsProps {
  tenderId: string;
}

const TenderBids: FC<TenderBidsProps> = ({ tenderId }) => {
  const { data } = useGetTenderBidsQuery(tenderId);

  return (
    <AdminPagesWrapper>
      <div className=''>
        <div className='mx-16  flex my-10 gap-2 flex-col items-center justify-center relative'>
          <h1 className='text-3xl text-gray-900 font-semibold'>Tender Bids</h1>
          <p className='text-gray-700'>View all bids on the tender</p>
        </div>

        <div className='rounded-lg p-4 bg-card-color-darker1'>
          <div className='flex items-center justify-between'>
            <Select
            // value={statusFilter}
            // onValueChange={setStatusFilter}
            >
              <SelectTrigger className='w-full sm:w-[180px] bg-white'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='approved'>Approved</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
              </SelectContent>
            </Select>

            <div className=' rounded-lg bg-white p-2 flex items-center gap-4'>
              {/* <div className='flex items-center mb-3'>
                <Star className='h-4 w-4 mr-2 text-yellow-500' />
                <h3 className='text-sm font-medium'>Filter by Score</h3>
              </div> */}
              <RadioGroup
                defaultValue='all'
                className='flex text-sm flex-wrap gap-4'
                // onValueChange={setScoreFilter}
                // value={scoreFilter}
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='all'
                    id='all'
                  />
                  <label htmlFor='all'>All Scores</label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='high'
                    id='high'
                  />
                  <label htmlFor='high'>High (4-5)</label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='medium'
                    id='medium'
                  />
                  <label htmlFor='medium'>Medium (3)</label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='low'
                    id='low'
                  />
                  <label htmlFor='low'>Low (1-2)</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {data?.bids?.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-lg text-muted-foreground'>
              No bids found matching your criteria
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
            {data?.bids?.map((bid: IBidCard) => (
              <div key={bid.id}>
                <BidCard
                  bid={bid}
                  tenderId={tenderId}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminPagesWrapper>
  );
};

export default TenderBids;
