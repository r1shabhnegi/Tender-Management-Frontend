import Heading from "@/components/Shared/Heading";
import BidDetails from "@/components/Bid/BidDetails";
import React, { use } from "react";

const Details = ({ params }: { params: Promise<{ ids: string[] }> }) => {
  const resolvedParams = use(params);
  const { ids } = resolvedParams;

  const tenderId = ids[0];
  const bidId = ids[1];

  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <BidDetails
        tenderId={tenderId}
        bidId={bidId}
      />
    </div>
  );
};

export default Details;
