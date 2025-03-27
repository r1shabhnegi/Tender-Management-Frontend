import {
  IItemInfo,
  IKeyDate,
  ITenderFeeDetails,
  ITenderPreQualification,
  ITenderSupportDocument,
  IVenderDocRequirement,
} from "@/app/Types/Tender-Types";
import InfoCard from "@/components/Shared/InfoCard";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";
import React, { FC, memo, ReactNode } from "react";

interface Props {
  isPreviewData: {
    itemInfo: IItemInfo;
    keyDates: IKeyDate;
    tenderFeeDetails: ITenderFeeDetails;
    tenderSupportDocuments: ITenderSupportDocument[];
    venderDocRequirement: IVenderDocRequirement[];
    tenderPreQualifications: ITenderPreQualification[];
  };
  isLoading: boolean;
  status: string;
  setStatus: (status: string) => void;
  setActive: (active: number) => void;
}

interface SectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = memo(({ title, subtitle, children }) => (
  <div className='pb-4 mb-4'>
    <div className='bg-card-color-darker1 rounded-md px-5 py-3 pb-4 mb-4 flex justify-between items-center'>
      <h2 className=' text-gray-800'>
        <span className='font-semibold'>{title} : </span> {subtitle}
      </h2>
    </div>
    <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-100 rounded-md'>
      {children}
    </div>
  </div>
));

Section.displayName = "Section";

const MissingFieldIndicator: FC = memo(() => (
  <p
    className='text-red-500 font-medium text-[13px]'
    aria-live='polite'>
    This field is required
  </p>
));

MissingFieldIndicator.displayName = "MissingFieldIndicator";

// Define a union type that includes all possible value types from your data
type ValueType =
  | string
  | number
  | boolean
  | Date
  | File
  | Record<string, unknown>
  | null
  | undefined
  | ITenderSupportDocument
  | IVenderDocRequirement
  | ITenderPreQualification;

const CreateTenderPreview: FC<Props> = ({
  isPreviewData,
  setActive,
  isLoading,
  status,
  setStatus,
}) => {
  const handleUploadTenderData = (newStatus: string) => {
    setStatus(newStatus);
  };

  const camelToWords = (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const isValueMissing = (value: ValueType): boolean => {
    return !value || (typeof value === "string" && value === "NaN");
  };

  const renderValueAsString = (value: ValueType): string => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (value instanceof File) {
      return value.name;
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return String(value || "");
  };

  const renderValue = (value: ValueType): ReactNode => {
    if (value instanceof File) {
      return <span>{value.name}</span>;
    }

    if (Array.isArray(value)) {
      return (
        <ul className='list-disc pl-5'>
          {value.map((item, index) => (
            <li key={index}>{renderValue(item as ValueType)}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div className='flex flex-col ml-2 mt-2'>
          {Object.entries(value).map(([key, val]) => (
            <div
              key={key}
              className='mb-1'>
              <span className='bg-gray-100 text-black rounded-md'>
                <span className='font-bold mr-2 text-gray-700'>
                  {camelToWords(key)} :
                </span>
                {isValueMissing(val as ValueType)
                  ? ""
                  : renderValue(val as ValueType)}
              </span>
              {isValueMissing(val as ValueType) && <MissingFieldIndicator />}
            </div>
          ))}
        </div>
      );
    }

    return (
      <span>
        {typeof value === "string" && value === "NaN"
          ? ""
          : renderValueAsString(value)}
      </span>
    );
  };

  const renderField = (
    key: string,
    value: ValueType,
    isDate: boolean = false
  ) => (
    <div key={key}>
      <span className='bg-gray-100 text-black rounded-md'>
        <span className='font-bold mr-2 text-gray-700'>
          {camelToWords(key)} :
        </span>
        {isValueMissing(value)
          ? ""
          : isDate && value instanceof Date
          ? format(value, "PPP")
          : renderValueAsString(value)}
      </span>
      {isValueMissing(value) && <MissingFieldIndicator />}
    </div>
  );

  const getOrdinalSuffix = (index: number): string => {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";
    if (index === 2) return "3rd";
    return `${index + 1}th`;
  };

  const renderDocument = (key: string, value: ValueType) => (
    <div key={key}>
      <span className='bg-gray-100 rounded-md'>
        <span className='font-bold mr-2'>
          {getOrdinalSuffix(Number(key))} Document :
        </span>
        {isValueMissing(value) ? "" : renderValue(value)}
      </span>
      {isValueMissing(value) && <MissingFieldIndicator />}
    </div>
  );

  const renderQualification = (key: string, value: ValueType) => (
    <div key={key}>
      <span className='bg-gray-100 rounded-md'>
        <span className='font-bold mr-2'>
          {getOrdinalSuffix(Number(key))} Qualification Detail :
        </span>
        {renderValue(value)}
      </span>
      {isValueMissing(value) && <MissingFieldIndicator />}
    </div>
  );

  return (
    <InfoCard
      title='Tender Preview'
      information='Review the tender details'>
      <div className='space-y-6'>
        {/* <div className='pb-4 mb-4'>
          <div className='bg-card-color-darker1 rounded-lg p-5 pb-4 mb-4'>
            <h2 className='text-gray-700'>
              <span className='text-gray-900'>Step 1 :</span> Tender Item
              Details: Enter primary information
            </h2>
          </div>

          <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-100 rounded-md'>
            {Object.entries(isPreviewData.isItemInfo).map(([key, value]) =>
              renderField(key, value)
            )}
          </div>
        </div> */}
        <Section
          title='Step 1'
          subtitle='Tender Item Details: Enter primary information'>
          {Object.entries(isPreviewData?.itemInfo).map(([key, value]) =>
            renderField(key, value)
          )}
        </Section>

        <Section
          title='Step 2'
          subtitle='Support Docs: Attach required files'>
          {Object.entries(isPreviewData?.tenderSupportDocuments).map(
            ([key, value]) => renderDocument(key, value)
          )}
        </Section>

        <Section
          title='Step 3'
          subtitle='Bidder Docs: Specify required submissions'>
          {Object.entries(isPreviewData?.venderDocRequirement).map(
            ([key, value]) => renderDocument(key, value)
          )}
        </Section>

        <Section
          title='Step 4'
          subtitle='Key Dates: Specify important bid deadlines'>
          {Object.entries(isPreviewData?.keyDates).map(([key, value]) =>
            renderField(key, value, key.substring(key.length - 4) === "Date")
          )}
        </Section>

        <Section
          title='Step 5'
          subtitle='Fee / EMD: Enter fee details'>
          {Object.entries(isPreviewData?.tenderFeeDetails).map(([key, value]) =>
            renderField(key, value)
          )}
        </Section>

        <Section
          title='Step 6'
          subtitle='Tender Pre-Qualification: Enter eligibility details'>
          {Object.entries(isPreviewData?.tenderPreQualifications).map(
            ([key, value]) => renderQualification(key, value)
          )}
        </Section>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-6'>
        <Button
          type='button'
          className='bg-blue-200 rounded-lg text-gray-900 font-semibold hover:bg-blue-300 transition-colors duration-300 w-full sm:w-auto'
          onClick={() => setActive(5)}>
          Previous
        </Button>

        <div className='flex gap-3 justify-end w-full sm:w-auto'>
          <Button
            type='submit'
            disabled={isLoading}
            className='bg-blue-400 rounded-lg text-gray-950 font-semibold hover:bg-blue-500 transition-colors duration-300 w-full sm:w-auto'
            onClick={() => handleUploadTenderData("draft")}
            aria-busy={status === "draft" && isLoading}>
            {status === "draft" && isLoading ? (
              <LoaderCircle className='animate-spin mr-2' />
            ) : null}
            Save as Draft
          </Button>
          <Button
            type='submit'
            disabled={isLoading}
            className='bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto'
            onClick={() => handleUploadTenderData("live")}
            aria-busy={status === "live" && isLoading}>
            {status === "live" && isLoading ? (
              <LoaderCircle className='animate-spin mr-2' />
            ) : null}
            Publish Tender
          </Button>
        </div>
      </div>
    </InfoCard>
  );
};

export default memo(CreateTenderPreview);
