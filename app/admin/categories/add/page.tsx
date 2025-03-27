import CreateCategory from "@/components/Admin/Categories/CreateCategory";
import Heading from "@/components/Shared/Heading";
import React from "react";

const Add = () => {
  return (
    <div className='pt-[3.8rem]'>
      {/* <Protected> */}
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <CreateCategory />
      {/* </Protected> */}
    </div>
  );
};

export default Add;
