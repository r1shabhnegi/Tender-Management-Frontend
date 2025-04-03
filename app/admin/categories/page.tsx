// import dynamic from "next/dynamic";
import Heading from "@/components/Shared/Heading";
import React from "react";
import ManageCategories from "@/components/Categories/For-Admin/ManageCategories";

// const ManageCategories = dynamic(
//   () => import("@/components/Categories/For-Admin/ManageCategories"),
//   {
//     loading: () => (
//       <div className='min-h-screen flex items-center justify-center'>
//         <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'>
//           asds
//         </div>
//       </div>
//     ),
//   }
// );

const Categories = () => {
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      ?
      <ManageCategories />
      {/* </Suspense> */}
    </div>
  );
};

export default Categories;
