import { FC } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  information?: string;
  className?: string;
  backButtonLink?: string;
}

const InfoCard: FC<InfoCardProps> = ({
  title,
  children,
  className = "",
  information,
  backButtonLink,
}) => {
  return (
    <div className={`bg-card-color/50 border-none rounded-xl p-6 ${className}`}>
      <div className='flex justify-between mb-4 pb-2 border-b items-center'>
        <div className='flex items-center gap-3'>
          <h2 className='text-lg text-gray-900 font-semibold '>{title}</h2>
          {information && (
            <HoverCard openDelay={250}>
              <HoverCardTrigger asChild>
                <Info className='text-gray-700 size-4 mb-1' />
              </HoverCardTrigger>
              <HoverCardContent className='w-[16rem] text-sm '>
                <div className=' space-x-4'>
                  {/* <span className='font-semibold mr-1 text-blue-800'>
                    Note:
                  </span> */}
                  {information}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        {backButtonLink && (
          <Button
            className='shadow-none rounded-lg'
            variant={"outline"}>
            <ArrowLeft />
            <Link href={backButtonLink}>Back</Link>
          </Button>
        )}
      </div>

      <div className='space-y-4'>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default InfoCard;
