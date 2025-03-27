import { formLabelStyle, inputStyle } from "@/app/Styles";
import { IVenderRegistrationForm } from "@/app/Types/User-Types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import React, { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  handleNextStep: (active: number) => void;
}

const VendorInfo: FC<Props> = ({ handleNextStep }) => {
  const [showPW, setShowPW] = useState(true);

  const [showErrors, setShowErrors] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext<IVenderRegistrationForm>();

  const password = watch("password");

  const handleNext = async () => {
    setShowErrors(true);
    const fieldsToValidate = [
      "fullname",
      "email",
      "contactNumber",
      "panCardNumber",
      "password",
      "confirmPassword",
    ];
    const result = await trigger(
      fieldsToValidate as (keyof IVenderRegistrationForm)[]
    );

    if (result) {
      handleNextStep(1);
    }
  };

  const showErrorMessage = (fieldName: keyof typeof errors) => {
    return showErrors && errors[fieldName] ? (
      <p className='text-red-600 text-[0.85rem] ml-0.5 mt-1'>
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
            <span className='text-blue-600 font-semibold'>Step 1</span> : Vendor
            Information
          </h2>
          <p className='bg-white rounded-lg text-gray-700 px-6 py-6'>
            <span className='font-semibold text-gray-900 mr-1'>Note:</span>You
            need to attach relevant documents in the next step
          </p>
        </div>

        <div className='rounded-md p-4 mx-4 mb-4 flex flex-col gap-8'>
          <div className='flex gap-4'>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='email'>
                Email
              </label>
              <Input
                id='email'
                className={inputStyle}
                placeholder='Enter email address here'
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {showErrorMessage("email")}
            </div>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='fullname'>
                Full Name
              </label>
              <Input
                id='fullname'
                className={inputStyle}
                placeholder='Enter full name here'
                {...register("fullname", {
                  required: "Full name is required.",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters",
                  },
                })}
              />
              {showErrorMessage("fullname")}
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='contactNumber'>
                Contact Number
              </label>
              <Input
                id='contactNumber'
                className={inputStyle}
                placeholder='Enter Contact Number here'
                {...register("contactNumber", {
                  required: "Contact Number is required.",
                  pattern: {
                    value: /^\d{10,15}$/,
                    message: "Invalid contact number",
                  },
                })}
              />
              {showErrorMessage("contactNumber")}
            </div>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='panCardNumber'>
                Pan Card Number
              </label>
              <Input
                type='text'
                id='panCardNumber'
                className={inputStyle}
                placeholder='Enter pan card number'
                {...register("panCardNumber", {
                  required: "PAN card number is required",
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: "Invalid PAN card number",
                  },
                })}
              />
              {showErrorMessage("panCardNumber")}
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='relative flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='password'>
                Password
              </label>
              <Input
                id='password'
                type={!showPW ? "text" : "password"}
                className={inputStyle}
                placeholder='Enter password here'
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
              />
              {showErrorMessage("password")}
              <div className='absolute right-2 top-8'>
                {showPW ? (
                  <EyeClosedIcon
                    className='w-6 h-6 cursor-pointer text-gray-500'
                    onClick={() => setShowPW(false)}
                  />
                ) : (
                  <EyeIcon
                    className='w-6 h-6 cursor-pointer text-blue-500'
                    onClick={() => setShowPW(true)}
                  />
                )}
              </div>
            </div>
            <div className=' flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='confirmPassword'>
                Confirm Password
              </label>
              <Input
                id='confirmPassword'
                type='password'
                className={inputStyle}
                placeholder='Re-enter password here'
                {...register("confirmPassword", {
                  required: "Confirm password is required.",
                  validate: (value) =>
                    value === password || "Passwords do not match.",
                })}
              />
              {showErrorMessage("confirmPassword")}
            </div>
          </div>

          <div className='flex justify-end'>
            <Button
              type='button'
              className='bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'
              onClick={handleNext}>
              Submit & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInfo;
