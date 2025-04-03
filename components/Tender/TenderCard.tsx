import React, { FC } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  CreditCard,
  Tag,
  FileCode2,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import { ITenderCard } from "@/app/Types/Tender-Types";
import { borderStyle, primaryButtonStyle } from "@/app/Styles";
import { cn } from "@/lib/utils";

const TenderCard: FC<{ tender: ITenderCard }> = ({ tender }) => {
  const router = useRouter();

  // Determine tender status based on bid end date
  // const getBidStatus = () => {
  //   const isExpired =
  //     isPast(tender?.bidEndDate) && !isToday(tender?.bidEndDate);
  //   const isEnding = isToday(tender?.bidEndDate);

  //   if (isExpired) {
  //     return {
  //       label: "Closed",
  //       icon: <AlertCircle className='w-3 h-3 mr-1' />,
  //       className: "bg-red-100 text-red-700",
  //     };
  //   } else if (isEnding) {
  //     return {
  //       label: "Ending Today",
  //       icon: <Clock className='w-3 h-3 mr-1' />,
  //       className: "bg-amber-100 text-amber-700",
  //     };
  //   } else {
  //     return {
  //       label: "Active",
  //       icon: <CheckCircle2 className='w-3 h-3 mr-1' />,
  //       className: "bg-emerald-100 text-emerald-700",
  //     };
  //   }
  // };

  // const status = getBidStatus();

  return (
    <div
      className={cn(
        "relative duration-300 border-b border-gray-400/60 rounded-x max-w-[60rem] overflow-hidden pb-4",
        borderStyle
      )}>
      {/* <div className=' py-1 rounded-tl-xl rounded-tr-xl flex justify-between items-center px-4'>
        <div className='flex items-center'>
          <span className='font-medium text-black text-sm mr-1.5'>
            Tender {tender.type}
          </span>
          <span className='text-black text-sm'>#{tender.tenderNumber}</span>
        </div>
        <div
          className={`${status.className} rounded-full px-3 py-1 text-xs flex items-center`}>
          {status.icon}
          <span className='font-medium'>{status.label}</span>
        </div>
      </div> */}

      <div className='flex  p-5'>
        <div className='flex-1 space-y-4'>
          <div>
            <h3 className='text-[1.30rem] font-semibold text-text-color-1 line-clamp-2 leading-tight'>
              {tender.title}
            </h3>
            <div className='flex items-center mt-2 text-gray-600'>
              {/* <Building2 className='w-4 h-4 mr-2' /> */}
              <span className='text-[0.85rem]'>
                The Energy and Resources Institute (TERI)
              </span>
            </div>
          </div>

          {/* Tags Section */}
          <div className='flex flex-wrap gap-2'>
            <span className='px-3 py-1 text-xs font-medium bg-primary/5 text-accent rounded-[0.4rem]'>
              {capitalizeFirstLetter(tender.type)}
            </span>
            <span className='px-3 py-1 text-xs font-medium bg-primary/5 text-accent rounded-[0.4rem]'>
              {capitalizeFirstLetter(tender.category)}
            </span>
          </div>

          {/* Details Grid */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center text-gray-600'>
              <div className='p-2 mr-3 bg-primary/5 flex items-center justify-center rounded-full'>
                <Briefcase className='text-gray-600 size-4' />
              </div>
              <div className='flex flex-col'>
                <span className='text-xs text-text-color-2'>Department</span>
                <span className='text-[0.85rem] font-medium text-text-color-1'>
                  {tender.department}
                </span>
              </div>
            </div>
            <div className='flex items-center text-gray-600'>
              <div className='p-2 mr-3 bg-primary/5 flex items-center justify-center rounded-full'>
                <MapPin className='text-gray-600 size-4' />
              </div>
              <div className='flex flex-col'>
                <span className='text-xs text-text-color-2'>Location</span>
                <span className='text-[0.85rem] font-medium text-text-color-1'>
                  {capitalizeFirstLetter(tender.location)}
                </span>
              </div>
            </div>
            <div className='flex items-center text-gray-600'>
              <div className='p-2 mr-3 bg-primary/5 flex items-center justify-center rounded-full'>
                <Tag className='text-gray-600 size-4' />
              </div>
              <div className='flex flex-col'>
                <span className='text-xs text-text-color-2'>Scope</span>
                <span className='text-[0.85rem] font-medium text-text-color-1'>
                  {capitalizeFirstLetter(tender.scope)}
                </span>
              </div>
            </div>
            <div className='flex items-center text-gray-600'>
              <div className='p-2 mr-3 bg-primary/5 flex items-center justify-center rounded-full'>
                <FileCode2 className='text-gray-600 size-4' />
              </div>
              <div className='flex flex-col'>
                <span className='text-xs text-text-color-2'>Tender Number</span>
                <span className='text-[0.85rem] font-medium text-text-color-1'>
                  #TN{tender.tenderNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className='w-64 flex flex-col justify-between border-l border-gray-200 pl-5'>
          {/* Important Information */}
          <div className='space-y-2'>
            <div className='flex items-center text-gray-700 px-3 py-2 rounded-lg'>
              <Calendar className='w-4 h-4 mr-2' />

              <span className='text-[0.85rem] font-medium'>
                Bid Ends:
                {format(tender?.bidEndDate, "dd MMM yyyy")}
              </span>
            </div>

            <div className='flex items-center text-gray-700 px-3 py-2 rounded-lg'>
              <FileText className='w-4 h-4 mr-2' />
              <span className='text-[0.85rem] flex items-center'>
                Doc Fee: <IndianRupee className='w-3 h-3 ml-1.5' />
                {tender.documentFee}
              </span>
            </div>

            <div className='flex items-center text-gray-700 px-3 py-1.5 rounded-lg'>
              <CreditCard className='w-4 h-4 mr-2' />
              <span className='text-[0.85rem] flex items-center'>
                EMD: <IndianRupee className='w-3 h-3 ml-1.5' />
                {tender.emd}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => router.push(`/tender/${tender.id}`)}
            className={primaryButtonStyle}>
            <span>View Details</span>
            <ArrowRight className='size-4 group-hover:translate-x-0.5 transition-transform' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenderCard;
