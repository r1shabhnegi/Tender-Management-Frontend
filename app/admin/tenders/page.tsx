import ManageTenders from "@/components/Admin/ManageTenders/ManageTenders";
import Heading from "@/components/Shared/Heading";
import React from "react";

const Tenders = () => {
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <ManageTenders />
    </div>
  );
};

export default Tenders;
