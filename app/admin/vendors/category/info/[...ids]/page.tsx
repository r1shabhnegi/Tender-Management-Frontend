import AddVenderCategory from "@/components/Admin/Vendors/VenderDetails/AddVenderCategory";
import Heading from "@/components/Shared/Heading";
import React, { use } from "react";

const Edit = ({ params }: { params: Promise<{ ids: string[] }> }) => {
  const resolvedParams = use(params);
  const { ids } = resolvedParams;
  const userId = ids[0];
  const categoryId = ids[1];

  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <AddVenderCategory
        userId={userId}
        isEditMode={true}
        userCategoryId={categoryId}
      />
    </div>
  );
};

export default Edit;
