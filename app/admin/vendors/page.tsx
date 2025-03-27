import Heading from "@/components/Shared/Heading";
import React from "react";
import ManageVenders from "@/components/Admin/Vendors/ManageVenders";

const Venders = () => {
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <ManageVenders />
    </div>
  );
};

export default Venders;
