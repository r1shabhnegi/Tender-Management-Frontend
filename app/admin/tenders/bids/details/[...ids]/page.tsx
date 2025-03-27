import Heading from "@/components/Shared/Heading";
import BidDetails from "@/components/Bid/BidDetails";
import React, { use } from "react";

const Details = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const page = resolvedParams;

  console.log(page);
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <BidDetails />
    </div>
  );
};

export default Details;
