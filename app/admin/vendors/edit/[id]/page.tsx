import VendorEdit from "@/components/Vendor/For-Admin/VendorEdit";
import Heading from "@/components/Shared/Heading";
import { use } from "react";

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
      <VendorEdit vendorId={id} />
    </div>
  );
};

export default Vendor;
