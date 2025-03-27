import React, { FC } from "react";
import {
  FileText,
  Building2,
  Users,
  Calendar,
  Banknote,
  MapPin,
  FileCheck,
  ClipboardList,
  AlertCircle,
  Download,
} from "lucide-react";
import GeneralWrapper from "../Shared/GeneralWrapper";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface TenderData {
  id: string;
  company: string;
  department: string;
  tender_number: string;
  type: string;
  scope: string;
  category: string;
  title: string;
  description: string;
  tech_prebid_qual: string;
  tech_weightage: number;
  commercial_weightage: number;
  doc_fee: string;
  fee_payable_at: string;
  emd: string;
  edm_payable_at: string;
  location: string;
  value: string;
  pre_publish_date: string;
  publish_date: string;
  sale_close_date: string;
  clarification_start_date: string;
  clarification_end_date: string;
  revision_publishment_date: string;
  bid_submission_end_date: string;
  bid_open_date: string;
  status: "draft" | "live" | "closed";
  created_at: string;
}

interface VendorDocRequirement {
  id: string;
  name: string;
  format: string;
  purpose: string;
  tender_id: string;
  created_at: string;
}

interface TenderPrequalification {
  id: string;
  title: string;
  description: string;
  score: number;
  tender_id: string;
  created_at: string;
}

interface TenderSupportDocument {
  id: string;
  name: string;
  purpose: string;
  doc_url: string;
  tender_id: string;
  created_at: string;
}

interface TenderDataResponse {
  tender: TenderData;
  bidderDocumentsReq: VendorDocRequirement[];
  tenderPreQualification: TenderPrequalification[];
  tenderSupportDocuments: TenderSupportDocument[];
}

interface ApiResponse {
  isSuccess: boolean;
  tenderData: TenderDataResponse;
}

interface DateDisplayProps {
  label: string;
  date: string;
}

function DateDisplay({ label, date }: DateDisplayProps) {
  return (
    <div className='flex items-center gap-2 text-sm'>
      <Calendar className='w-4 h-4 text-gray-500' />
      <span className='font-medium text-gray-900'>{label}:</span>
      <span className='text-gray-900'>{format(new Date(date), "PPP")}</span>
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <Card className='w-full border-none rounded-xl shadow-sm p-6 mb-6 bg-card-color'>
      <div className='flex items-center gap-2 mb-4'>
        <Icon className='w-5 h-5 text-primary' />
        <h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
      </div>
      {children}
    </Card>
  );
}

interface TenderDetailsProps {
  tenderData: ApiResponse;
}

const TenderDetails: FC<TenderDetailsProps> = ({ tenderData }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.authSlice);

  const {
    tender,
    bidderDocumentsReq,
    tenderPreQualification,
    tenderSupportDocuments,
  } = tenderData?.tenderData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  return (
    <GeneralWrapper>
      <div className='mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <header className='mb-8'>
          <div className='flex flex-col items-center justify-center py-8'>
            <h1 className='text-3xl md:text-4xl text-gray-900 font-bold mb-4'>
              Tender Details
            </h1>

            <div className='flex flex-col sm:flex-row items-center gap-3 mb-2'>
              <p className='text-gray-700 font-medium'>
                <span className='text-gray-500'>Tender Number:</span>{" "}
                {tender.tender_number}
              </p>

              {isLoggedIn && (
                <Badge
                  variant={tender.status === "live" ? "secondary" : "default"}
                  className={`capitalize ${getStatusColor(tender.status)}`}>
                  {tender.status}
                </Badge>
              )}
            </div>

            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <Building2 className='w-4 h-4' />
              <span>
                {tender.company} - {tender.department}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column */}
          <div className='lg:col-span-2 space-y-6'>
            <Section
              title='Basic Information'
              icon={FileText}>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-medium text-gray-900 text-lg mb-2'>
                    {tender.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {tender.description}
                  </p>
                </div>
                <div className='flex flex-wrap gap-4 pt-2'>
                  <div className='flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg'>
                    <MapPin className='w-4 h-4 text-gray-500' />
                    <span className='text-sm font-medium'>
                      {tender.location}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg'>
                    <span className='text-sm font-medium'>
                      Type: {tender.type}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg'>
                    <span className='text-sm font-medium'>
                      Category: {tender.category}
                    </span>
                  </div>
                </div>
              </div>
            </Section>

            <Section
              title='Technical Requirements'
              icon={ClipboardList}>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Pre-bid Qualifications
                  </h3>
                  <p className='mt-2 text-gray-700 leading-relaxed'>
                    {tender.tech_prebid_qual}
                  </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2'>
                  <div className='bg-blue-50 p-3 rounded-lg'>
                    <h3 className='text-sm font-medium text-blue-900'>
                      Technical Weightage
                    </h3>
                    <p className='mt-1 text-xl font-bold text-blue-700'>
                      {tender.tech_weightage}%
                    </p>
                  </div>
                  <div className='bg-indigo-50 p-3 rounded-lg'>
                    <h3 className='text-sm font-medium text-indigo-900'>
                      Commercial Weightage
                    </h3>
                    <p className='mt-1 text-xl font-bold text-indigo-700'>
                      {tender.commercial_weightage}%
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Section
                title='Important Dates'
                icon={Calendar}>
                <div className='space-y-3'>
                  <DateDisplay
                    label='Pre-publish Date'
                    date={tender.pre_publish_date}
                  />
                  <DateDisplay
                    label='Publish Date'
                    date={tender.publish_date}
                  />
                  <DateDisplay
                    label='Sale Close Date'
                    date={tender.sale_close_date}
                  />
                  <DateDisplay
                    label='Bid Submission End Date'
                    date={tender.bid_submission_end_date}
                  />
                  <DateDisplay
                    label='Bid Open Date'
                    date={tender.bid_open_date}
                  />
                </div>
              </Section>
              <Section
                title='Prequalification Criteria'
                icon={AlertCircle}>
                <ul className='space-y-3'>
                  {tenderPreQualification.map(
                    (qual: TenderPrequalification, index: number) => (
                      <li
                        key={index}
                        className='text-sm border-b border-gray-100 pb-2 last:border-0'>
                        <div className='flex justify-between items-start'>
                          <span className='font-medium text-gray-900'>
                            {qual.title}
                          </span>
                          <Badge
                            variant='outline'
                            className='bg-blue-50 text-blue-700 border-blue-200'>
                            Score: {qual.score}
                          </Badge>
                        </div>
                        <p className='text-gray-700 text-xs mt-1 leading-relaxed'>
                          {qual.description}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </Section>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-6'>
            <Section
              title='Financial Details'
              icon={Banknote}>
              <div className='space-y-4'>
                <div className='bg-green-50 p-4 rounded-lg'>
                  <h3 className='text-sm font-medium text-green-900'>
                    Tender Value
                  </h3>
                  <p className='mt-1 text-xl font-bold text-green-700'>
                    {tender.value}
                  </p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-900 mb-1'>
                    Document Fee
                  </h3>
                  <p className='text-sm text-gray-700 bg-gray-50 p-2 rounded'>
                    <span className='font-medium'>{tender.doc_fee}</span>
                    <span className='text-gray-500 text-xs'>
                      {" "}
                      payable at {tender.fee_payable_at}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-900 mb-1'>
                    EMD
                  </h3>
                  <p className='text-sm text-gray-700 bg-gray-50 p-2 rounded'>
                    <span className='font-medium'>{tender.emd}</span>
                    <span className='text-gray-500 text-xs'>
                      {" "}
                      payable at {tender.edm_payable_at}
                    </span>
                  </p>
                </div>
              </div>
            </Section>

            <Section
              title='Support Documents'
              icon={FileCheck}>
              <ul className='space-y-3'>
                {tenderSupportDocuments?.map(
                  (doc: TenderSupportDocument, index: number) => (
                    <li
                      key={index}
                      className='text-sm bg-gray-50 rounded-lg p-3 transition-all hover:bg-gray-100'>
                      <div className='flex justify-between items-center'>
                        <a
                          href={doc.doc_url}
                          className='text-blue-600 hover:text-blue-800 font-medium truncate max-w-[200px]'>
                          {doc.name}
                        </a>
                        <Button
                          size='icon'
                          variant='ghost'
                          asChild
                          className='h-8 w-8'>
                          <a
                            href={doc.doc_url}
                            download>
                            <Download className='h-4 w-4' />
                          </a>
                        </Button>
                      </div>
                      <p className='text-gray-700 text-xs mt-1'>
                        {doc.purpose}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </Section>

            <Section
              title='Required Documents'
              icon={Users}>
              <ul className='space-y-3'>
                {bidderDocumentsReq.map(
                  (doc: VendorDocRequirement, index: number) => (
                    <li
                      key={index}
                      className='text-sm bg-gray-50 p-3 rounded-lg'>
                      <span className='font-medium text-gray-900 block mb-1'>
                        {doc.name}
                      </span>
                      <div className='flex items-center gap-2 text-xs'>
                        <Badge
                          variant='outline'
                          className='bg-gray-100 text-gray-700 border-gray-200'>
                          {doc.format}
                        </Badge>
                        <span className='text-gray-600'>{doc.purpose}</span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </Section>
          </div>
        </div>

        <div className='mt-8 pt-6 border-t '>
          <Link href={`/tender/buy/${tender.id}`}>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-xl'>
              Buy Tender
            </Button>
          </Link>
          <p className='mt-2 text-sm text-gray-500'>
            By buying this tender, you will be able to bid on it.
          </p>
        </div>
      </div>
    </GeneralWrapper>
  );
};

export default TenderDetails;
