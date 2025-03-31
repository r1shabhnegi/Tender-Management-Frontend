import { Skeleton } from "@/components/ui/skeleton";

const TenderCardSkeleton = () => {
  return (
    <div className='flex flex-col max-w-[55rem] mb-4 space-y-3'>
      <Skeleton className='h-[8rem] rounded-xl bg-gray-100 ' />
      <div className='space-y-2 flex flex-col gap-2'>
        <div>
          <Skeleton className='h-8 bg-gray-100 ' />
        </div>
      </div>
    </div>
  );
};

export default TenderCardSkeleton;
