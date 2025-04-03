import Heading from "@/components/Shared/Heading";
import BidsOnTender from "@/components/Bid/For-Admin/BidsOnTender";
import React, { use } from "react";

const Bids = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <BidsOnTender tenderId={id} />
    </div>
  );
};

export default Bids;
