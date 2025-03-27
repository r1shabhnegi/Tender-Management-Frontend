import { Calendar } from "@/components/ui/calendar";
import React, { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { inputStyle } from "@/app/Styles";
import { useFormContext } from "react-hook-form";
import InfoCard from "@/components/Shared/InfoCard";

interface Props {
  setActive: (active: number) => void;
}

const keyDateDescriptions = [
  {
    key: "prePublishDate",
    name: "Pre Publish Date",
    description:
      "During pre-publish stage, the tender info (minimal info like Title & Description) will be shown in the upcoming tenders. The suppliers can set alerts and bookmark it.",
  },
  {
    key: "publishDate",
    name: "Publish Date",
    description:
      "This is actual tender publish date. On this date, the tender will be live at Online for the suppliers to view all details and bid",
  },
  {
    key: "tenderSaleCloseDate",
    name: "Tender Sale Close Date",
    description:
      "This is actual tender publish date. On this date, the tender will be live at Online for the suppliers to view all details and bid",
  },
  {
    key: "clarificationStartDate",
    name: "Clarification Start Date",
    description:
      "Any suppliers will ask the queries before this date. Queries will be answered directly or updated in online as answers or answered in revision.",
  },
  {
    key: "clarificationEndDate",
    name: "Clarification End Date",
    description:
      "Any suppliers will ask the queries before this date. Queries will be answered directly or updated in online as answers or answered in revision.",
  },
  {
    key: "revisionPublishmentDate",
    name: "Revision Publishment Date",
    description: "Based on queries, the Revision of Tender may be added",
  },
  {
    key: "bidSubmissionEndDate",
    name: "Bid Submission End Date",
    description:
      "The closing date & time for Bidding. After this, no supplier allowed to bid.",
  },
  {
    key: "bidOpenDate",
    name: "Bid Open Date",
    description:
      "The date on which the bids are opened and the winner announced",
  },
];

const KeyDates: FC<Props> = ({ setActive }) => {
  const { setValue, watch } = useFormContext();

  function setDateFun(date: Date | undefined, key: string) {
    setValue(key, date);
  }

  return (
    <InfoCard
      title='Key Dates'
      information='Add the key dates for the tender. Suppliers will be notified about these dates.'>
      <div className='mt-5'>
        {keyDateDescriptions?.map((keyDate, i) => (
          <div
            key={i}
            className='rounded-xl bg-card-color-darker1 p-4  mb-5 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <label className='text-gray-900'>{keyDate.name}</label>
              <span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        inputStyle,
                        !watch(`keyDates.${keyDate.key}`) &&
                          "text-muted-foreground"
                      )}>
                      {watch(`keyDates.${keyDate.key}`) ? (
                        format(
                          new Date(watch(`keyDates.${keyDate.key}`)),
                          "PPP"
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0'
                    align='start'>
                    <Calendar
                      mode='single'
                      selected={
                        watch(`keyDates.${keyDate.key}`)
                          ? new Date(watch(`keyDates.${keyDate.key}`))
                          : undefined
                      }
                      onSelect={(e) => setDateFun(e, `keyDates.${keyDate.key}`)}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </span>
            </div>

            <p className='text-gray-700 text-sm'>{keyDate.description}</p>
          </div>
        ))}
        <div className='flex gap-5 justify-between items-center'>
          <Button
            type='button'
            className='bg-blue-200 rounded-lg text-gray-900 font-semibold hover:bg-blue-300 transition-colors duration-300'
            onClick={() => setActive(2)}>
            Previous
          </Button>
          {/* <Button type='button'>Reset</Button> */}
          <Button
            type='button'
            className='bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'
            onClick={() => setActive(4)}>
            Next
          </Button>
        </div>
      </div>
    </InfoCard>
  );
};

export default KeyDates;
