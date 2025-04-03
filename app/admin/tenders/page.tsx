import Heading from "@/components/Shared/Heading";
import ManageTenders from "@/components/Tender/For-Admin/ManageTenders";
import React from "react";

async function getTenders() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  return promise;
}

const Tenders = async () => {
  await getTenders();

  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <ManageTenders />
    </div>
  );
};

export default Tenders;
