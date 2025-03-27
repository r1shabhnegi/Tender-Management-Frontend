"use client";
import CreateTender from "@/components/Admin/CreateTender/CreateTender";
import Heading from "@/components/Shared/Heading";
import React from "react";

const page = () => {
  return (
    <div className='pt-[3.5rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <CreateTender />
    </div>
  );
};

export default page;
