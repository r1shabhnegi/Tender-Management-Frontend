import ManageCategories from "@/components/Admin/Categories/ManageCategories";
import Heading from "@/components/Shared/Heading";
import React from "react";

const Categories = () => {
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <ManageCategories />
    </div>
  );
};

export default Categories;
