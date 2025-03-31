"use client";
import Heading from "@/components/Shared/Heading";
import React from "react";
import TenderCard from "@/components/Tender/TenderCard";
import { Button } from "@/components/ui/button";
import { ITenderCard } from "@/app/Types/Tender-Types";

const QualifiedTendersPage = () => {
  // Mock data - in a real app, this would come from an API
  const qualifiedTenders: ITenderCard[] = [
    {
      id: "4",
      title: "Green Building Construction Materials",
      status: "live",
      tenderNumber: "TERI/2023/CONSTRUCTION/004",
      bidEndDate: "2023-12-15",
      documentFee: "3500",
      emd: "80000",
      department: "Construction",
      type: "Material Supply",
      scope: "National",
      category: "Construction",
      location: "Delhi",
    },
    {
      id: "5",
      title: "Waste Management System",
      status: "live",
      tenderNumber: "TERI/2023/ENV/005",
      bidEndDate: "2023-12-20",
      documentFee: "2500",
      emd: "60000",
      department: "Environmental Science",
      type: "Service",
      scope: "State",
      category: "Environment",
      location: "Bangalore",
    },
    {
      id: "6",
      title: "Laboratory Equipment for Climate Research",
      status: "live",
      tenderNumber: "TERI/2023/CLIMATE/006",
      bidEndDate: "2023-12-25",
      documentFee: "4000",
      emd: "100000",
      department: "Climate Research",
      type: "Equipment",
      scope: "International",
      category: "Research",
      location: "Goa",
    },
  ];

  return (
    <div className='pt-[3.8rem] px-8 py-6'>
      <Heading
        title='Qualified Tenders'
        description='Tenders you have qualified for bidding'
        keywords='Qualified, Tenders, Vendor'
      />

      <div className='mt-6'>
        <h1 className='text-2xl font-bold mb-6'>Your Qualified Tenders</h1>

        {qualifiedTenders.length > 0 ? (
          <div className='flex flex-col gap-5 mb-10'>
            {qualifiedTenders.map((tender) => (
              <div
                className='relative max-w-[55rem]'
                key={tender.id}>
                <TenderCard tender={tender} />
                <span className='absolute bg-green-100 border-green-200 border text-[0.75rem] rounded-tl-xl text-green-800 rounded px-2 -top-0 -left-0'>
                  Qualified
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-10'>
            <p className='text-gray-500 mb-4'>
              You haven&apos;t qualified for any tenders yet.
            </p>
            <Button className='bg-green-600 hover:bg-green-700'>
              Browse Available Tenders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualifiedTendersPage;
