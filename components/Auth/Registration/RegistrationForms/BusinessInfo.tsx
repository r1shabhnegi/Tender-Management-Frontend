import { formLabelStyle, inputStyle } from "@/app/Styles";
import { IVenderRegistrationForm } from "@/app/Types/User-Types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { businessClassification } from "@/lib/constants";
import React, { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  handleNextStep: (active: number) => void;
  setActive: (active: number) => void;
}

const BusinessInfo: FC<Props> = ({ handleNextStep, setActive }) => {
  const [showErrors, setShowErrors] = useState(false);
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext<IVenderRegistrationForm>();

  const years = Array.from(
    { length: new Date().getFullYear() - 1949 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleNext = async () => {
    setShowErrors(true);
    const fieldsToValidate = [
      "businessName",
      "businessClassification",
      "establishedYear",
      "registrationNumber",
      "panCardNumber",
      "addressLineOne",
      "locality",
      "city",
      "pinCode",
      "country",
    ];
    const result = await trigger(
      fieldsToValidate as (keyof IVenderRegistrationForm)[]
    );

    if (result) {
      handleNextStep(2);
    }
  };
  const showErrorMessage = (fieldName: keyof typeof errors) => {
    return showErrors && errors[fieldName] ? (
      <p className='text-red-500 text-xs mt-1'>
        {errors[fieldName]?.message as string}
      </p>
    ) : null;
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='drop-shadow bg-card-color p-2 rounded-xl w-full flex justify-center mt-8 flex-col'>
        <div className='mt-8'>
          <h1 className='font-medium text-2xl text-center'>
            Vendor Registration
          </h1>
        </div>

        <div className='rounded-md p-4 mx-4 mt-4'>
          <h2 className='text-lg mb-5 ml-2.5 border-b-[1px] pb-4 border-gray-300'>
            <span className='text-blue-600 font-semibold'>Step 2</span> :
            Business Information
          </h2>
          <p className='bg-white rounded-lg text-gray-700 px-6 py-6'>
            <span className='font-semibold text-gray-900 mr-1'>Note:</span>
            you need to attach relevant documents in the next step
          </p>
        </div>

        <div className='rounded-md p-4 mx-4 mb-4 flex flex-col gap-8'>
          <div className='flex gap-5'>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='businessName'>
                Business Name
              </label>
              <Input
                id='businessName'
                className={inputStyle}
                placeholder='Enter business name here'
                {...register("businessName", {
                  required: "Business name is required",
                })}
              />
              {showErrorMessage("businessName")}
            </div>

            <div className='flex flex-col w-full justify-center'>
              <label className={formLabelStyle}>Business Classification</label>
              <Controller
                name='businessClassification'
                control={control}
                rules={{ required: "Business classification is required" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}>
                    <SelectTrigger className={inputStyle}>
                      <SelectValue
                        placeholder='Select Business Classification'
                        className='placeholder-gray-500'
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {businessClassification.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {showErrorMessage("businessClassification")}
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='registrationNumber'>
                Registration Number
              </label>
              <Input
                id='registrationNumber'
                type='number'
                className={inputStyle}
                placeholder='Enter registration number'
                {...register("registrationNumber", {
                  required: "Registration number is required",
                })}
              />
              {showErrorMessage("registrationNumber")}
            </div>
            <div className=' flex  w-full items-center gap-5'>
              <div className='flex flex-col w-full'>
                <label className={formLabelStyle}>Established Year</label>

                <Controller
                  name='establishedYear'
                  control={control}
                  rules={{ required: "Established year is required" }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={(val) => onChange(val)}
                      value={value?.toString()}>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder='Select year' />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((item) => (
                          <SelectItem
                            key={item}
                            value={item.toString()}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {showErrorMessage("establishedYear")}
              </div>
              <div className='flex w-full flex-col'>
                <label
                  className={formLabelStyle}
                  htmlFor='pinCode'>
                  Pin Code
                </label>
                <Input
                  id='pinCode'
                  className={inputStyle}
                  placeholder='Enter pin code'
                  {...register("pinCode", {
                    required: "PIN code is required",
                    pattern: {
                      value: /^\d{5,10}$/,
                      message: "Invalid PIN code",
                    },
                  })}
                />
                {showErrorMessage("pinCode")}
              </div>
            </div>
          </div>

          <div className='flex gap-5'>
            <div className='flex w-full flex-col'>
              <label className={formLabelStyle}>Country</label>
              <Controller
                name='country'
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}>
                    <SelectTrigger
                      className={
                        inputStyle + " [&_[data-placeholder]]:text-gray-500"
                      }>
                      <SelectValue
                        placeholder='Select country'
                        className='placeholder-gray-500'
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='India'>India</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {showErrorMessage("country")}
            </div>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='locality'>
                Locality
              </label>
              <Input
                id='locality'
                className={inputStyle}
                placeholder='Enter locality'
                {...register("locality", {
                  required: "Locality is required",
                })}
              />
              {showErrorMessage("locality")}
            </div>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='city'>
                City
              </label>
              <Input
                id='city'
                className={inputStyle}
                placeholder='Enter city'
                {...register("city", {
                  required: "City is required",
                })}
              />
              {showErrorMessage("city")}
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='addressLineOne'>
                Address Line 1
              </label>
              <Input
                id='addressLineOne'
                className={inputStyle}
                placeholder='Enter address line one here'
                {...register("addressLineOne", {
                  required: "Address line 1 is required",
                })}
              />
              {showErrorMessage("addressLineOne")}
            </div>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='addressLineTwo'>
                Address Line 2
              </label>
              <Input
                id='addressLineTwo'
                className={inputStyle}
                placeholder='Enter address line two here'
                {...register("addressLineTwo")}
              />
            </div>
          </div>

          <div className='flex gap-5 items-center justify-between'>
            <Button
              type='button'
              onClick={() => setActive(0)}
              className='bg-blue-200 rounded-lg hover:bg-blue-300  font-semibold text-gray-900 transition-colors duration-300'>
              Previous
            </Button>
            <Button
              type='button'
              onClick={handleNext}
              className='bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'>
              Submit & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
