import AddVenderCategory from "@/components/Vendor/For-Admin/AddVenderCategory";
import Heading from "@/components/Shared/Heading";
import React, { use } from "react";

const Category = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <AddVenderCategory
        userId={id}
        isEditMode={false}
      />
    </div>
  );
};

export default Category;
