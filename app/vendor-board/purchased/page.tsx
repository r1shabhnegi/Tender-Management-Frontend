"use client";
import Heading from "@/components/Shared/Heading";
import React from "react";
import TenderCard from "@/components/Tender/TenderCard";
import { Button } from "@/components/ui/button";
import { ITenderCard } from "@/app/Types/Tender-Types";

const PurchasedTendersPage = () => {
  // Mock data - in a real app, this would come from an API
  const purchasedTenders: ITenderCard[] = [
    {
      id: "1",
      title: "Supply of Computer Equipment",
      status: "live",
      tenderNumber: "TERI/2023/IT/001",
      bidEndDate: "2023-12-30",
      documentFee: "2000",
      emd: "50000",
      department: "IT Department",
      type: "Equipment",
      scope: "National",
      category: "IT",
      location: "Delhi",
    },
    {
      id: "2",
      title: "Office Furniture",
      status: "live",
      tenderNumber: "TERI/2023/ADMIN/002",
      bidEndDate: "2023-12-20",
      documentFee: "1500",
      emd: "40000",
      department: "Admin",
      type: "Goods",
      scope: "Local",
      category: "Admin",
      location: "Delhi",
    },
    {
      id: "3",
      title: "Renewable Energy Equipment",
      status: "live",
      tenderNumber: "TERI/2023/ENERGY/003",
      bidEndDate: "2023-12-25",
      documentFee: "3000",
      emd: "75000",
      department: "Energy Research",
      type: "Equipment",
      scope: "National",
      category: "Energy",
      location: "Gurgaon",
    },
  ];

  return (
    <div className='pt-[3.8rem] px-8 py-6'>
      <Heading
        title='Purchased Tenders'
        description='Tenders you have purchased documents for'
        keywords='Purchased, Tenders, Vendor'
      />

      <div className='mt-6'>
        <h1 className='text-2xl font-bold mb-6'>Your Purchased Tenders</h1>

        {purchasedTenders.length > 0 ? (
          <div className='flex flex-col gap-5 mb-10'>
            {purchasedTenders.map((tender) => (
              <div
                className='relative max-w-[55rem]'
                key={tender.id}>
                <TenderCard tender={tender} />
                <span className='absolute bg-blue-100 border-blue-200 border text-[0.75rem] rounded-tl-xl text-blue-800 rounded px-2 -top-0 -left-0'>
                  Purchased
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-10'>
            <p className='text-gray-500 mb-4'>
              You haven&apos;t purchased any tender documents yet.
            </p>
            <Button className='bg-blue-600 hover:bg-blue-700'>
              Browse Available Tenders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedTendersPage;
