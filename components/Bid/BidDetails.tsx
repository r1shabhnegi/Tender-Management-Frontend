// "use client";
// import { ReactNode, useEffect, useState } from "react";
// import { FileText, Building, User } from "lucide-react";
// import {
//   mockBids,
//   getVenderByUserId,
//   getBusinessByUserId,
//   getTenderById,
// } from "./MockData";
// import { formatDistanceToNow } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

// import StatusBadge from "../Tender/StatusBadge";
// import { DocumentLink } from "./Components";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";

// interface DetailItemProps {
//   label: string;
//   value: string | null | undefined;
//   className?: string;
// }

// interface DetailSectionProps {
//   title: string;
//   children: ReactNode;
//   className?: string;
// }

// interface HeaderSectionProps {
//   title: string;
//   subtitle?: string;
//   children?: ReactNode;
//   actions?: ReactNode;
//   className?: string;
// }

// const HeaderSection = ({
//   title,
//   subtitle,
//   children,
//   actions,
//   className,
// }: HeaderSectionProps) => {
//   return (
//     <div className={cn("mb-8", className)}>
//       <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
//         <div>
//           <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
//           {subtitle && (
//             <p className='mt-1.5 text-lg text-muted-foreground'>{subtitle}</p>
//           )}
//         </div>
//         {actions && <div className='flex-shrink-0'>{actions}</div>}
//       </div>
//       {children && <div className='mt-4'>{children}</div>}
//     </div>
//   );
// };

// const DetailSection = ({ title, children, className }: DetailSectionProps) => {
//   return (
//     <section
//       className={cn("rounded-xl border bg-card p-6 shadow-sm", className)}>
//       <h3 className='text-xl font-medium mb-4'>{title}</h3>
//       <div className='space-y-4'>{children}</div>
//     </section>
//   );
// };

// const DetailItem = ({ label, value, className }: DetailItemProps) => {
//   return (
//     <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-2", className)}>
//       <p className='text-sm text-muted-foreground'>{label}</p>
//       <p className='text-sm font-medium sm:text-right break-words'>
//         {value || "—"}
//       </p>
//     </div>
//   );
// };

// const BidDetails = () => {
//   const bidId = "bid_1";
//   //   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const [localBid, setLocalBid] = useState(null);

//   useEffect(() => {
//     // Simulate loading
//     const timer = setTimeout(() => {
//       setIsLoading(false);

//       const foundBid = mockBids.find((b) => b.id === bidId);

//       if (!foundBid) {
//         toast.error("Bid not found");
//         // navigate("/bids");
//       } else {
//         setLocalBid({ ...foundBid });
//       }
//     }, 800);

//     return () => clearTimeout(timer);
//   }, [bidId]);

//   if (isLoading || !localBid) {
//     return (
//       <div className='container py-12 flex items-center justify-center min-h-[60vh]'>
//         <div className='animate-pulse flex flex-col items-center'>
//           <div className='h-8 w-48 bg-muted rounded mb-4'></div>
//           <div className='h-4 w-64 bg-muted rounded'></div>
//         </div>
//       </div>
//     );
//   }

//   const vendor = getVenderByUserId(localBid.vender_id);
//   const business = getBusinessByUserId(localBid.vender_id);
//   const tender = getTenderById(localBid.tender_id);

//   if (!vendor || !business || !tender) {
//     return null;
//   }

//   const formattedDate = formatDistanceToNow(new Date(localBid.created_at), {
//     addSuffix: true,
//   });

//   const handleTechnicalScoreChange = (score: number) => {
//     setLocalBid({ ...localBid, technical_score: score });

//     // In a real app, this would update the database
//     const bidIndex = mockBids.findIndex((b) => b.id === bidId);
//     if (bidIndex !== -1) {
//       mockBids[bidIndex].technical_score = score;
//     }
//   };

//   const handleFinancialScoreChange = (score: number) => {
//     setLocalBid({ ...localBid, financial_score: score });

//     // In a real app, this would update the database
//     const bidIndex = mockBids.findIndex((b) => b.id === bidId);
//     if (bidIndex !== -1) {
//       mockBids[bidIndex].financial_score = score;
//     }
//   };

//   return (
//     <div className='container py-8 px-4 sm:px-6 lg:px-8 mx-auto animate-fade-in'>
//       {/* <Link
//         href='/bids'
//         className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6'>
//         <ArrowLeft className='mr-2 h-4 w-4' />
//         Back to Bids
//       </Link> */}

//       <HeaderSection
//         title={`Bid for ${tender.title}`}
//         subtitle={`Submitted ${formattedDate}`}
//         actions={
//           <StatusBadge
//             status={localBid.status}
//             size='lg'
//           />
//         }
//       />

//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
//         <div
//           className='lg:col-span-2 animate-fade-in'
//           style={{ animationDelay: "0.1s" }}>
//           <DetailSection title='Bid Information'>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//               <DetailItem
//                 label='DD Number'
//                 value={localBid.dd_number}
//               />
//               <DetailItem
//                 label='DD Date'
//                 value={localBid.dd_date}
//               />
//               <DetailItem
//                 label='Bank Number'
//                 value={localBid.bank_number}
//               />
//               <DetailItem
//                 label='Bank Branch'
//                 value={localBid.bank_branch}
//               />
//             </div>

//             <Separator className='my-4' />

//             <h4 className='text-sm font-medium mb-3'>Tender Information</h4>
//             <DetailItem
//               label='Tender Title'
//               value={tender.title}
//             />
//             <DetailItem
//               label='Organization'
//               value={tender.organization}
//             />
//             <DetailItem
//               label='Description'
//               value={tender.description}
//             />

//             <Separator className='my-4' />

//             <h4 className='text-sm font-medium mb-3'>Documents</h4>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//               <DocumentLink
//                 url={localBid.technical_doc_url}
//                 label='Technical Document'
//                 score={localBid.technical_score}
//                 onScoreChange={handleTechnicalScoreChange}
//               />
//               <DocumentLink
//                 url={localBid.financial_doc_url}
//                 label='Financial Document'
//                 score={localBid.financial_score}
//                 onScoreChange={handleFinancialScoreChange}
//               />
//             </div>

//             {localBid.optional_info && (
//               <>
//                 <Separator className='my-4' />
//                 <h4 className='text-sm font-medium mb-2'>
//                   Additional Information
//                 </h4>
//                 <p className='text-sm'>{localBid.optional_info}</p>
//               </>
//             )}
//           </DetailSection>
//         </div>

//         <div
//           className='space-y-6 animate-fade-in'
//           style={{ animationDelay: "0.2s" }}>
//           <DetailSection
//             title='Vendor Information'
//             className='border-l-4 border-l-primary'>
//             <div className='flex items-center gap-3 mb-4'>
//               <div className='bg-primary/10 p-2 rounded-full'>
//                 <User className='h-5 w-5 text-primary' />
//               </div>
//               <div>
//                 <h4 className='font-medium'>{vendor.full_name}</h4>
//                 <p className='text-sm text-muted-foreground'>
//                   Vendor ID: {vendor.id.substring(0, 8)}
//                 </p>
//               </div>
//             </div>

//             <Separator className='my-3' />

//             <DetailItem
//               label='Status'
//               value={vendor.status}
//             />
//             <DetailItem
//               label='Contact'
//               value={vendor.contact_number}
//             />
//             <DetailItem
//               label='PAN Number'
//               value={vendor.pan_card_number}
//             />
//             <div className='mt-3'>
//               <Button
//                 variant='outline'
//                 size='sm'
//                 className='w-full'
//                 asChild>
//                 <a
//                   href={vendor.pan_card_doc_url}
//                   target='_blank'
//                   rel='noopener noreferrer'>
//                   <FileText className='mr-2 h-4 w-4' />
//                   View PAN Card
//                 </a>
//               </Button>
//             </div>
//           </DetailSection>

//           <DetailSection
//             title='Business Information'
//             className='border-l-4 border-l-primary'>
//             <div className='flex items-center gap-3 mb-4'>
//               <div className='bg-primary/10 p-2 rounded-full'>
//                 <Building className='h-5 w-5 text-primary' />
//               </div>
//               <div>
//                 <h4 className='font-medium'>{business.business_name}</h4>
//                 <p className='text-sm text-muted-foreground'>
//                   {business.business_classification}
//                 </p>
//               </div>
//             </div>

//             <Separator className='my-3' />

//             <DetailItem
//               label='Reg. Number'
//               value={business.registration_number}
//             />
//             <DetailItem
//               label='Established'
//               value={business.established_year}
//             />
//             <DetailItem
//               label='Location'
//               value={`${business.city}, ${business.country}`}
//             />

//             <h4 className='text-sm font-medium mt-4 mb-2'>Address</h4>
//             <p className='text-sm'>
//               {business.address_line1}, {business.address_line2},<br />
//               {business.locality}, {business.city},<br />
//               {business.pin_code}, {business.country}
//             </p>

//             <div className='mt-3'>
//               <Button
//                 variant='outline'
//                 size='sm'
//                 className='w-full'
//                 asChild>
//                 <a
//                   href={business.registration_doc_url}
//                   target='_blank'
//                   rel='noopener noreferrer'>
//                   <FileText className='mr-2 h-4 w-4' />
//                   View Registration Doc
//                 </a>
//               </Button>
//             </div>
//           </DetailSection>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BidDetails;

import React from "react";

const BidDetails = () => {
  return <div>BidDetails</div>;
};

export default BidDetails;
