import CategoryDetails from "@/components/Categories/For-Admin/CategoryDetails";
import Heading from "@/components/Shared/Heading";
import React, { use } from "react";

const Details = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div className='pt-[3.8rem]'>
      {/* <Protected> */}
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <CategoryDetails categoryId={id} />
      {/* </Protected> */}
    </div>
  );
};

export default Details;
