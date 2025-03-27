"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import Heading from "@/components/Shared/Heading";
import React from "react";

const page = () => {
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <AdminDashboard />
    </div>
  );
};

export default page;
