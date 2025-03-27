import Home from "../components/Home/Home";
import Heading from "@/components/Shared/Heading";

export default function Main() {
  return (
    <div className='pt-[3.5rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />
      <Home />
    </div>
  );
}
