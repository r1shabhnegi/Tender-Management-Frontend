"use client";
import { FC, useState, useEffect } from "react";
import {
  FileText,
  Building,
  User,
  BarChart4,
  FileCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  useGetBidByIdQuery,
  useUpdateBidScoreMutation,
} from "@/Redux/bid/bidApi";
import PageLoading from "@/components/Shared/PageLoading";
import AdminPagesWrapper from "@/components/Admin/AdminPagesWrapper";
import { format } from "date-fns";
import { toast } from "sonner";
import { useGetS3FileQuery } from "@/Redux/api";
import PdfViewerModal from "@/components/Shared/PdfViewerModal";

interface DetailItemProps {
  label: string;
  value: string | null | undefined;
  className?: string;
}
const DetailItem = ({ label, value, className }: DetailItemProps) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-2", className)}>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='text-sm font-medium break-words text-gray-900'>
        {value || "—"}
      </p>
    </div>
  );
};

interface ScoreInputProps {
  currentScore: number;
  maxScore: number;
  onScoreChange: (newScore: number) => void;
  disabled?: boolean;
}

const ScoreInput: FC<ScoreInputProps> = ({
  currentScore,
  maxScore,
  onScoreChange,
  disabled = false,
}) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='relative flex items-center'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className={`cursor-pointer transition-colors ${
              index < currentScore
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
            onClick={() => !disabled && onScoreChange(index + 1)}
          />
        ))}
      </div>
      <span className='text-sm font-medium text-gray-700'>
        {currentScore}/{maxScore}
      </span>
    </div>
  );
};

interface Props {
  bidId: string;
}
const pdfFolder = process.env.NEXT_PUBLIC_AWS_S3_PDF_FOLDER;
const BidDetails: FC<Props> = ({ bidId }) => {
  const [technicalScore, setTechnicalScore] = useState<number>(0);
  const [financialScore, setFinancialScore] = useState<number>(0);
  const [updateBidScore, { isLoading: isUpdating }] =
    useUpdateBidScoreMutation();
  const [viewPdf, setViewPdf] = useState<string | null>(null);
  const [isPdfModal, setIsPdfModal] = useState<boolean>(false);

  const { data, isLoading } = useGetBidByIdQuery(bidId);

  const { data: technicalDoc, isLoading: isTechnicalDocLoading } =
    useGetS3FileQuery(
      `${pdfFolder}/${data?.bidsDetails?.bidData?.technical_doc_s3_name}`
    );
  const { data: financialDoc, isLoading: isFinancialDocLoading } =
    useGetS3FileQuery(
      `${pdfFolder}/${data?.bidsDetails?.bidData?.financial_doc_s3_name}`
    );
  console.log(technicalDoc, financialDoc);
  // Initialize scores from bidData if available
  useEffect(() => {
    if (data?.bidsDetails) {
      const { bidData } = data.bidsDetails;
      setTechnicalScore(Math.min(Math.abs(bidData?.technical_score || 0), 5));
      setFinancialScore(Math.min(Math.abs(bidData?.financial_score || 0), 5));
    }
  }, [data]);

  if (isLoading || isTechnicalDocLoading || isFinancialDocLoading)
    return <PageLoading />;

  const { bidData, tenderData, vendorData, businessData } = data?.bidsDetails;

  const handleTechnicalScoreChange = async (newScore: number) => {
    setTechnicalScore(newScore);
    try {
      await updateBidScore({
        bidId,
        technicalScore: newScore,
        financialScore,
      }).unwrap();
      toast.success("Technical score updated successfully");
    } catch (error) {
      toast.error("Failed to update technical score");
      console.error("Error updating technical score:", error);
    }
  };

  const handleFinancialScoreChange = async (newScore: number) => {
    setFinancialScore(newScore);
    try {
      await updateBidScore({
        bidId,
        technicalScore,
        financialScore: newScore,
      }).unwrap();
      toast.success("Financial score updated successfully");
    } catch (error) {
      toast.error("Failed to update financial score");
      console.error("Error updating financial score:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <AdminPagesWrapper>
      <div className='w-full bg-white mb-8'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Bid Details</h1>
              <p className='text-gray-600 mt-2 max-w-2xl'>
                Review the complete information for this bid submission and the
                vendor&apos;s qualifications.
              </p>
            </div>
            <Badge
              className={getStatusColor(bidData?.status)}
              variant='outline'>
              {bidData?.status || "Pending"}
            </Badge>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 mb-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8'>
              <div className='p-4 bg-gray-50 border-b flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <BarChart4
                    size={18}
                    className='text-primary'
                  />
                  <h2 className='font-semibold text-gray-900'>
                    Bid Information
                  </h2>
                </div>
              </div>
              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <DetailItem
                    label='DD Number'
                    value={bidData?.dd_number}
                  />
                  <DetailItem
                    label='DD Date'
                    value={format(bidData?.dd_date, "PPP")}
                  />
                  <DetailItem
                    label='Bank Number'
                    value={bidData?.bank_number}
                  />
                  <DetailItem
                    label='Bank Branch'
                    value={bidData?.bank_branch}
                  />
                </div>

                <Separator className='my-6' />

                <h4 className='text-sm font-semibold text-gray-800 mb-4'>
                  Tender Information
                </h4>
                <DetailItem
                  label='Tender Title'
                  value={tenderData?.title}
                  className='mb-2'
                />
                <DetailItem
                  label='Organization'
                  value={tenderData?.organization}
                  className='mb-2'
                />
                <DetailItem
                  label='Description'
                  value={tenderData?.description}
                />

                <Separator className='my-6' />

                <h4 className='text-sm font-semibold text-gray-800 mb-4'>
                  Documents
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-white p-5 flex flex-col gap-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <div className='h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center'>
                          <FileText className='h-4 w-4 text-blue-600' />
                        </div>
                        <h4 className='font-semibold text-gray-800'>
                          Technical Document
                        </h4>
                      </div>
                      <Badge
                        variant='outline'
                        className='bg-blue-50 text-blue-700 border-blue-200'>
                        Required
                      </Badge>
                    </div>

                    <Separator className='my-1' />

                    <div className='flex flex-col gap-2'>
                      <div className='flex justify-between items-center'>
                        <p className='text-sm text-gray-600'>
                          Evaluation Score
                        </p>
                        <ScoreInput
                          currentScore={technicalScore}
                          maxScore={5}
                          onScoreChange={handleTechnicalScoreChange}
                          disabled={isUpdating}
                        />
                      </div>

                      <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
                        <span className='bg-gray-100 px-2 py-1 rounded'>
                          {bidData?.technical_doc_url
                            ? "Document uploaded"
                            : "No document"}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(bidData?.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant='default'
                      size='sm'
                      className='w-full cursor-pointer bg-gradient-to-r from-accent to-accent/80 hover:bg-accent/90 text-white py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-sm'
                      disabled={!bidData?.technical_doc_s3_name}
                      onClick={() => {
                        setViewPdf(technicalDoc?.url);
                        setIsPdfModal(true);
                      }}>
                      <FileText className='mr-2 h-4 w-4' />
                      View Document
                    </Button>
                  </div>

                  <div className='bg-white p-5 flex flex-col gap-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <div className='h-8 w-8 rounded-full bg-green-100 flex items-center justify-center'>
                          <FileText className='h-4 w-4 text-green-600' />
                        </div>
                        <h4 className='font-semibold text-gray-800'>
                          Financial Document
                        </h4>
                      </div>
                      <Badge
                        variant='outline'
                        className='bg-green-50 text-green-700 border-green-200'>
                        Required
                      </Badge>
                    </div>

                    <Separator className='my-1' />

                    <div className='flex flex-col gap-2'>
                      <div className='flex justify-between items-center'>
                        <p className='text-sm text-gray-600'>
                          Evaluation Score
                        </p>
                        <ScoreInput
                          currentScore={financialScore}
                          maxScore={5}
                          onScoreChange={handleFinancialScoreChange}
                          disabled={isUpdating}
                        />
                      </div>

                      <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
                        <span className='bg-gray-100 px-2 py-1 rounded'>
                          {bidData?.financial_doc_url
                            ? "Document uploaded"
                            : "No document"}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(bidData?.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant='default'
                      size='sm'
                      className='w-full cursor-pointer bg-gradient-to-r from-accent to-accent/80 hover:bg-accent/90 text-white py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-sm'
                      disabled={!bidData?.financial_doc_s3_name}
                      onClick={() => {
                        setViewPdf(financialDoc.url);
                        setIsPdfModal(true);
                      }}>
                      <FileText className='mr-2 h-4 w-4' />
                      View Document
                    </Button>
                  </div>
                </div>

                {bidData?.optional_info && (
                  <>
                    <Separator className='my-6' />
                    <h4 className='text-sm font-semibold text-gray-800 mb-4'>
                      Additional Information
                    </h4>
                    <p className='text-sm text-gray-700'>
                      {bidData?.optional_info}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
              <div className='p-4 bg-gray-50 border-b flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <User
                    size={18}
                    className='text-primary'
                  />
                  <h2 className='font-semibold text-gray-900'>
                    Vendor Information
                  </h2>
                </div>
              </div>
              <div className='p-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
                    <User className='h-5 w-5 text-blue-700' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900'>
                      {vendorData?.full_name}
                    </h4>
                    <p className='text-sm text-gray-500'>
                      Vendor ID: {vendorData?.id.toString().substring(0, 8)}
                    </p>
                  </div>
                </div>

                <Separator className='my-4' />

                <DetailItem
                  label='Status'
                  value={vendorData?.status}
                  className='mb-2'
                />
                <DetailItem
                  label='Contact'
                  value={vendorData?.contact_number}
                  className='mb-2'
                />
                <DetailItem
                  label='PAN Number'
                  value={vendorData?.pan_card_number}
                  className='mb-3'
                />
                <div className='mt-3'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full border-primary text-primary hover:bg-primary/10'>
                    <a
                      href={vendorData?.pan_card_doc_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-center w-full'>
                      <FileText className='mr-2 h-4 w-4' />
                      View PAN Card
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
              <div className='p-4 bg-gray-50 border-b flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Building
                    size={18}
                    className='text-primary'
                  />
                  <h2 className='font-semibold text-gray-900'>
                    Business Information
                  </h2>
                </div>
              </div>
              <div className='p-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='h-10 w-10 rounded-full bg-green-100 flex items-center justify-center'>
                    <Building className='h-5 w-5 text-green-700' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900'>
                      {businessData?.business_name}
                    </h4>
                    <p className='text-sm text-gray-500'>
                      {businessData?.business_classification}
                    </p>
                  </div>
                </div>

                <Separator className='my-4' />

                <DetailItem
                  label='Reg. Number'
                  value={businessData?.registration_number}
                  className='mb-2'
                />
                <DetailItem
                  label='Established'
                  value={businessData?.established_year}
                  className='mb-2'
                />
                <DetailItem
                  label='Location'
                  value={`${businessData?.city}, ${businessData?.country}`}
                  className='mb-2'
                />

                <h4 className='text-sm font-semibold text-gray-800 mt-4 mb-2'>
                  Address
                </h4>
                <p className='text-sm text-gray-700'>
                  {businessData?.address_line1}, {businessData?.address_line2},
                  <br />
                  {businessData?.locality}, {businessData?.city},<br />
                  {businessData?.pin_code}, {businessData?.country}
                </p>

                <div className='mt-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full border-primary text-primary hover:bg-primary/10'>
                    <a
                      href={businessData?.registration_doc_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-center w-full'>
                      <FileCheck className='mr-2 h-4 w-4' />
                      View Registration Doc
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPdfModal && (
        <PdfViewerModal
          file={viewPdf}
          setIsPdfModal={setIsPdfModal}
        />
      )}
    </AdminPagesWrapper>
  );
};

export default BidDetails;
