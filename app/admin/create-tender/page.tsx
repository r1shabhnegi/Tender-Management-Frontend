"use client";
import Heading from "@/components/Shared/Heading";
import CreateTender from "@/components/Tender/For-Admin/CreateTender";
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
