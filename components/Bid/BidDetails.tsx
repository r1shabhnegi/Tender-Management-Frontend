"use client";
import { FC } from "react";
import { FileText, Building, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DocumentLink } from "./Components";
import { cn } from "@/lib/utils";
import { useGetBidByIdQuery } from "@/Redux/bid/bidApi";
import PageLoading from "../Shared/PageLoading";
import InfoCard from "../Shared/InfoCard";

interface DetailItemProps {
  label: string;
  value: string | null | undefined;
  className?: string;
}

const DetailItem = ({ label, value, className }: DetailItemProps) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-2", className)}>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <p className='text-sm font-medium sm:text-right break-words'>
        {value || "—"}
      </p>
    </div>
  );
};

interface Props {
  tenderId: string;
  bidId: string;
}

const BidDetails: FC<Props> = ({ tenderId, bidId }) => {
  const { data, isLoading } = useGetBidByIdQuery(bidId);

  console.log(tenderId);

  if (isLoading) return <PageLoading />;

  const { bidData, tenderData, vendorData, businessData } = data?.bidsDetails;

  // const formattedDate = formatDistanceToNow(new Date(bidData?.created_at), {
  //   addSuffix: true,
  // });

  // const handleTechnicalScoreChange = (score: number) => {
  //   setLocalBid({ ...localBid, technical_score: score });

  //   // In a real app, this would update the database
  //   const bidIndex = mockBids.findIndex((b) => b.id === bidId);
  //   if (bidIndex !== -1) {
  //     mockBids[bidIndex].technical_score = score;
  //   }
  // };

  // const handleFinancialScoreChange = (score: number) => {
  //   setLocalBid({ ...localBid, financial_score: score });

  //   // In a real app, this would update the database
  //   const bidIndex = mockBids.findIndex((b) => b.id === bidId);
  //   if (bidIndex !== -1) {
  //     mockBids[bidIndex].financial_score = score;
  //   }
  // };

  return (
    <div className=' py-8 px-4 sm:px-6 lg:px-8 mx-auto'>
      {/* <Link
        href='/bids'
        className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6'>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to Bids
      </Link> */}

      {/* <HeaderSection
        title={`Bid for ${tenderData?.title}`}
        subtitle={`Submitted ${formattedDate}`}
        actions={
          <StatusBadge
            status={bidData?.status}
            size='lg'
          />
        }
      /> */}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
        <div
          className='lg:col-span-2 animate-fade-in'
          style={{ animationDelay: "0.1s" }}>
          <InfoCard title='Bid Information'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <DetailItem
                label='DD Number'
                value={bidData?.dd_number}
              />
              <DetailItem
                label='DD Date'
                value={bidData?.dd_date}
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

            <Separator className='my-4' />

            <h4 className='text-sm font-medium mb-3'>Tender Information</h4>
            <DetailItem
              label='Tender Title'
              value={tenderData?.title}
            />
            <DetailItem
              label='Organization'
              value={tenderData?.organization}
            />
            <DetailItem
              label='Description'
              value={tenderData?.description}
            />

            <Separator className='my-4' />

            <h4 className='text-sm font-medium mb-3'>Documents</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <DocumentLink
                url={bidData?.technical_doc_url}
                label='Technical Document'
                score={bidData?.technical_score}
                // onScoreChange={handleTechnicalScoreChange}
              />
              <DocumentLink
                url={bidData?.financial_doc_url}
                label='Financial Document'
                score={bidData?.financial_score}
                // onScoreChange={handleFinancialScoreChange}
              />
            </div>

            {bidData?.optional_info && (
              <>
                <Separator className='my-4' />
                <h4 className='text-sm font-medium mb-2'>
                  Additional Information
                </h4>
                <p className='text-sm'>{bidData?.optional_info}</p>
              </>
            )}
          </InfoCard>
        </div>

        <div
          className='space-y-6 animate-fade-in'
          style={{ animationDelay: "0.2s" }}>
          <InfoCard title='Vendor Information'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-primary/10 p-2 rounded-full'>
                <User className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h4 className='font-medium'>{vendorData?.full_name}</h4>
                <p className='text-sm text-muted-foreground'>
                  Vendor ID: {vendorData?.id.toString().substring(0, 8)}
                </p>
              </div>
            </div>

            <Separator className='my-3' />

            <DetailItem
              label='Status'
              value={vendorData?.status}
            />
            <DetailItem
              label='Contact'
              value={vendorData?.contact_number}
            />
            <DetailItem
              label='PAN Number'
              value={vendorData?.pan_card_number}
            />
            <div className='mt-3'>
              <Button
                variant='outline'
                size='sm'
                className='w-full'
                asChild>
                <a
                  href={vendorData?.pan_card_doc_url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <FileText className='mr-2 h-4 w-4' />
                  View PAN Card
                </a>
              </Button>
            </div>
          </InfoCard>

          <InfoCard title='Business Information'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-primary/10 p-2 rounded-full'>
                <Building className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h4 className='font-medium'>{businessData?.business_name}</h4>
                <p className='text-sm text-muted-foreground'>
                  {businessData?.business_classification}
                </p>
              </div>
            </div>

            <Separator className='my-3' />

            <DetailItem
              label='Reg. Number'
              value={businessData?.registration_number}
            />
            <DetailItem
              label='Established'
              value={businessData?.established_year}
            />
            <DetailItem
              label='Location'
              value={`${businessData?.city}, ${businessData?.country}`}
            />

            <h4 className='text-sm font-medium mt-4 mb-2'>Address</h4>
            <p className='text-sm'>
              {businessData?.address_line1}, {businessData?.address_line2},
              <br />
              {businessData?.locality}, {businessData?.city},<br />
              {businessData?.pin_code}, {businessData?.country}
            </p>

            <div className='mt-3'>
              <Button
                variant='outline'
                size='sm'
                className='w-full'
                asChild>
                <a
                  href={businessData?.registration_doc_url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <FileText className='mr-2 h-4 w-4' />
                  View Registration Doc
                </a>
              </Button>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default BidDetails;
