import Heading from "@/components/Shared/Heading";
import React from "react";
import ManageVendors from "@/components/Vendor/For-Admin/ManageVendors";

const Venders = () => {
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <ManageVendors />
    </div>
  );
};

export default Venders;
