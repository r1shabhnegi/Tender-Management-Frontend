import Heading from "@/components/Shared/Heading";
import React, { use } from "react";
import VendorPreview from "@/components/Admin/Vendors/VendorPreview";

const Vendor = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for vendors to bid'
        keywords='Tender, Vendor, Projects'
      />
      <VendorPreview vendorId={id} />
    </div>
  );
};

export default Vendor;
