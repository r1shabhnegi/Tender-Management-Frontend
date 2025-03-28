import { formLabelStyle, inputStyle } from "@/app/Styles";
import InfoCard from "@/components/Shared/InfoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  setActive: (active: number) => void;
}

const TenderFeeDetails: FC<Props> = ({ setActive }) => {
  const { register } = useFormContext();

  return (
    <InfoCard
      title='Tender Fee Details'
      information='Add the tender fee details'>
      <div className='flex flex-col gap-5'>
        <div className='flex gap-5 items-center'>
          <div className='flex-1'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='tenderLocation'>
              Tender Location
            </label>
            <Input
              id='tenderLocation'
              className='rounded-xl bg-white'
              placeholder='Enter tender location'
              {...register("tenderFeeDetails.tenderLocation")}
            />
          </div>
          <div className='flex-1'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='tenderValue'>
              Tender Value
            </label>
            <Input
              id='tenderValue'
              className='rounded-xl bg-white'
              placeholder='Enter tender value'
              {...register("tenderFeeDetails.tenderValue")}
            />
          </div>
        </div>
        <div className='flex gap-5 items-center'>
          <div className='flex-1'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='documentFee'>
              Document Fee
            </label>
            <Input
              id='documentFee'
              className='rounded-xl bg-white'
              placeholder='Enter tender document fee'
              {...register("tenderFeeDetails.documentFee")}
            />
          </div>

          <div className='flex-1'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='EMD'>
              EMD
            </label>
            <Input
              id='EMD'
              className={inputStyle}
              placeholder='Enter EMD amount'
              {...register("tenderFeeDetails.EMD")}
            />
          </div>
        </div>

        <div className='flex gap-5 items-center'>
          <div className='flex-1'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='feePayableAt'>
              Fee Payable At
            </label>
            <Textarea
              id='feePayableAt'
              className={inputStyle}
              placeholder='Fee payment details'
              {...register("tenderFeeDetails.feePayableAt")}
            />
          </div>

          <div className='flex-1'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='emdPayableAt'>
              EMD Payable At
            </label>
            <Textarea
              id='emdPayableAt'
              className={inputStyle}
              placeholder='Enter location where EMD is payable'
              {...register("tenderFeeDetails.emdPayableAt")}
            />
          </div>
        </div>

        <div className='flex gap-5 mt-5 justify-between items-center'>
          <Button
            type='button'
            className='bg-blue-200 rounded-lg text-gray-900 font-semibold hover:bg-blue-300 transition-colors duration-300'
            onClick={() => setActive(3)}>
            Previous
          </Button>
          {/* <Button type='button'>Reset</Button> */}
          <Button
            type='button'
            className='bg-blue-600 rounded-lg  font-semibold hover:bg-blue-700 transition-colors duration-300'
            onClick={() => setActive(5)}>
            Next
          </Button>
        </div>
      </div>
    </InfoCard>
  );
};

export default TenderFeeDetails;
