import CreateCategory from "@/components/Admin/Categories/CreateCategory";
import Heading from "@/components/Shared/Heading";

const Edit = () => {
  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <CreateCategory />
    </div>
  );
};

export default Edit;
