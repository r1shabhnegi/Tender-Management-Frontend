"use client";
import VendorDashboard from "@/components/Vendor/VendorDashboard";
import Heading from "@/components/Shared/Heading";
import React from "react";

const VendorBoard = () => {
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Vendor Portal'
        description='Manage your tenders and bids'
        keywords='Tender, Vendor, Bids, Dashboard'
      />
      <VendorDashboard />
    </div>
  );
};

export default VendorBoard;
