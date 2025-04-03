"use client";
import { FC } from "react";
import { BidCard } from "@/components/Bid/BidCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AdminPagesWrapper from "@/components/Admin/AdminPagesWrapper";
import { useGetTenderBidsQuery } from "@/Redux/bid/bidApi";
import { IBidCard } from "@/app/Types/Bid-Types";
import { BarChart4, ClipboardList, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BidsOnTenderProps {
  tenderId: string;
}

const BidsOnTender: FC<BidsOnTenderProps> = ({ tenderId }) => {
  const { data, isLoading } = useGetTenderBidsQuery(tenderId);

  return (
    <AdminPagesWrapper>
      <div className='w-full bg-white mb-8'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Tender Bids</h1>
              <p className='text-gray-600 mt-2 max-w-2xl'>
                View and manage all bids submitted for this tender. Filter by
                status or score to find specific bids.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 mb-12'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6'>
          <div className='p-4 bg-gray-50 border-b flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <BarChart4
                size={18}
                className='text-primary'
              />
              <h2 className='font-semibold text-gray-900'>Filter Options</h2>
            </div>
            <span className='text-sm text-gray-500'>
              {data?.bids?.length || 0} total bids
            </span>
          </div>

          <div className='p-4'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
              <Select>
                <SelectTrigger className='w-full sm:w-[180px] bg-white border border-gray-200'>
                  <SelectValue placeholder='Filter by status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='approved'>Approved</SelectItem>
                  <SelectItem value='rejected'>Rejected</SelectItem>
                </SelectContent>
              </Select>

              <div className='rounded-lg bg-gray-50 p-3 border border-gray-200'>
                <RadioGroup
                  defaultValue='all'
                  className='flex text-sm flex-wrap gap-4'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='all'
                      id='all'
                    />
                    <label
                      htmlFor='all'
                      className='text-gray-700'>
                      All Scores
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='high'
                      id='high'
                    />
                    <label
                      htmlFor='high'
                      className='text-gray-700'>
                      High (4-5)
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='medium'
                      id='medium'
                    />
                    <label
                      htmlFor='medium'
                      className='text-gray-700'>
                      Medium (3)
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='low'
                      id='low'
                    />
                    <label
                      htmlFor='low'
                      className='text-gray-700'>
                      Low (1-2)
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          </div>
        ) : data?.bids?.length === 0 ? (
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden py-16 text-center'>
            <SearchX className='mx-auto h-12 w-12 text-gray-400 mb-4' />
            <h3 className='text-xl font-medium text-gray-900 mb-2'>
              No Bids Found
            </h3>
            <p className='text-gray-500 max-w-md mx-auto mb-6'>
              There are no bids matching your criteria for this tender.
            </p>
            <Button
              variant='outline'
              onClick={() => {}}
              className='border-primary text-primary'>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
            <div className='p-4 bg-gray-50 border-b flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <ClipboardList
                  size={18}
                  className='text-primary'
                />
                <h2 className='font-semibold text-gray-900'>Bid Submissions</h2>
              </div>
            </div>
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {data?.bids?.map((bid: IBidCard) => (
                  <div key={bid.id}>
                    <BidCard
                      bid={bid}
                      tenderId={tenderId}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPagesWrapper>
  );
};

export default BidsOnTender;
