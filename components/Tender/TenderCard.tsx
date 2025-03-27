import React, { FC } from "react";
import {
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  CreditCard,
  Tag,
  FileCode2,
  IndianRupee,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import { IconRight } from "react-day-picker";
import { ITenderCard } from "@/app/Types/Tender-Types";

const TenderCard: FC<{ tender: ITenderCard }> = ({ tender }) => {
  const router = useRouter();
  return (
    <div className='relative bg-card-color  rounded-xl border  max-w-[55rem] p-6 '>
      <div className='flex gap-6'>
        <div className='flex-1 space-y-4'>
          <div>
            <h3 className='text-xl font-semibold text-gray-900 line-clamp-2'>
              {tender.title}
            </h3>
            <div className='flex items-center mt-2 text-gray-700'>
              <Building2 className='w-4 h-4 mr-2' />
              <span className='text-sm'>
                The Energy and Resources Institute (TERI)
              </span>
            </div>
          </div>

          {/* Tags Section */}
          <div className='flex flex-wrap gap-2'>
            <span className='px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-[0.5rem]'>
              {capitalizeFirstLetter(tender.type)}
            </span>
            <span className='px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-[0.5rem]'>
              {capitalizeFirstLetter(tender.category)}
            </span>
          </div>

          {/* Details Grid */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center text-gray-700'>
              <Briefcase className='w-4 h-4 mr-2' />
              <span className='text-sm'>{tender.department}</span>
            </div>
            <div className='flex items-center text-gray-700'>
              <MapPin className='w-4 h-4 mr-2' />
              <span className='text-sm'>
                {capitalizeFirstLetter(tender.location)}
              </span>
            </div>
            <div className='flex items-center text-gray-700'>
              <Tag className='w-4 h-4 mr-2' />
              <span className='text-sm'>
                {capitalizeFirstLetter(tender.scope)}
              </span>
            </div>
            <div className='flex items-center text-gray-700'>
              <FileCode2 className='w-4 h-4 mr-2' />
              <span className='text-sm'>#TN{tender.tender_number}</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className='w-64 flex flex-col justify-between border-l pl-6'>
          {/* Important Information */}
          <div className='space-y-4'>
            <div className='flex items-center text-orange-700'>
              <Calendar className='w-4 h-4 mr-2' />
              <span className='text-sm font-medium'>
                Bid Ends:{" "}
                {format(tender.bid_submission_end_date, "dd MMM yyyy")}
              </span>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center text-gray-700'>
                <FileText className='w-4 h-4 mr-2' />
                <span className='text-sm flex items-center'>
                  Doc Fee: <IndianRupee className='w-3 h-3 ml-2' />
                  {tender.doc_fee}
                </span>
              </div>
              <div className='flex items-center text-gray-700'>
                <CreditCard className='w-4 h-4 mr-2' />
                <span className='text-sm flex items-center'>
                  EMD: <IndianRupee className='w-3 h-3 ml-2' />
                  {tender.emd}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            className='mt-4  bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'
            onClick={() => router.push(`/tender/${tender.id}`)}>
            View Details
            <IconRight className='size-2 p-0.5' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenderCard;
