"use client";
import Heading from "@/components/Shared/Heading";
import React from "react";
import TenderCard from "@/components/Tender/TenderCard";
import { Button } from "@/components/ui/button";
import { ITenderCard } from "@/app/Types/Tender-Types";

const ParticipatedTendersPage = () => {
  // Mock data - in a real app, this would come from an API
  const participatedTenders: ITenderCard[] = [
    {
      id: "7",
      title: "Renewable Energy Equipment",
      status: "live",
      tenderNumber: "TERI/2023/ENERGY/007",
      bidEndDate: "2023-11-30",
      documentFee: "3000",
      emd: "75000",
      department: "Energy Research",
      type: "Equipment",
      scope: "National",
      category: "Energy",
      location: "Chennai",
    },
    {
      id: "8",
      title: "IT Infrastructure Upgrade",
      status: "live",
      tenderNumber: "TERI/2023/IT/008",
      bidEndDate: "2023-11-25",
      documentFee: "2500",
      emd: "60000",
      department: "IT Department",
      type: "Service",
      scope: "Local",
      category: "IT",
      location: "Delhi",
    },
    {
      id: "9",
      title: "Conference Hall Audio-Visual System",
      status: "live",
      tenderNumber: "TERI/2023/INFRA/009",
      bidEndDate: "2023-12-05",
      documentFee: "2000",
      emd: "50000",
      department: "Infrastructure",
      type: "Equipment",
      scope: "Local",
      category: "Infrastructure",
      location: "Mumbai",
    },
  ];

  return (
    <div className='pt-[3.8rem] px-8 py-6'>
      <Heading
        title='Participated Tenders'
        description='Tenders you have submitted bids for'
        keywords='Participated, Tenders, Vendor, Bids'
      />

      <div className='mt-6'>
        <h1 className='text-2xl font-bold mb-6'>Your Participated Tenders</h1>

        {participatedTenders.length > 0 ? (
          <div className='flex flex-col gap-5 mb-10'>
            {participatedTenders.map((tender) => (
              <div
                className='relative max-w-[55rem]'
                key={tender.id}>
                <TenderCard tender={tender} />
                <span className='absolute bg-purple-100 border-purple-200 border text-[0.75rem] rounded-tl-xl text-purple-800 rounded px-2 -top-0 -left-0'>
                  Bid Submitted
                </span>
                <span className='absolute bg-blue-100 border-blue-200 border text-[0.75rem] rounded px-2 -top-0 left-28'>
                  Under Review
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-10'>
            <p className='text-gray-500 mb-4'>
              You haven&apos;t submitted bids for any tenders yet.
            </p>
            <Button className='bg-purple-600 hover:bg-purple-700'>
              Browse Available Tenders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipatedTendersPage;
