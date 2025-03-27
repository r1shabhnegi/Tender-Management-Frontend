import { Skeleton } from "@/components/ui/skeleton";

const TenderCardSkeleton = () => {
  return (
    <div className='flex flex-col mb-4 space-y-3'>
      <Skeleton className='h-[8rem] w-[55rem] rounded-xl' />
      <div className='space-y-2 flex flex-col gap-2'>
        <div>
          <Skeleton className='h-8 w-[55rem]' />
        </div>
      </div>
    </div>
  );
};

export default TenderCardSkeleton;
