"use client";
import Heading from "@/components/Shared/Heading";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { setAgreementForm } from "@/Redux/vendor/venderRegistrationSlice";
import { useRouter } from "next/navigation";

const Registration = () => {
  const [isAgreementFormErr, setIsAgreementFormErr] = useState({
    termErr: false,
    accPrivacyErr: false,
    businessEthicsErr: false,
  });

  const {
    isAcceptPrivacyChecked,
    isBusinessEthicsChecked,
    isTermServiceChecked,
  } = useSelector((state: RootState) => state.venderRegistrationSlice);

  const dispatch = useDispatch();
  const router = useRouter();

  function handleAgreementForm() {
    if (!isTermServiceChecked) {
      setIsAgreementFormErr((prev) => ({ ...prev, termErr: true }));
    } else {
      setIsAgreementFormErr((prev) => ({ ...prev, termErr: false }));
    }
    if (!isAcceptPrivacyChecked) {
      setIsAgreementFormErr((prev) => ({ ...prev, accPrivacyErr: true }));
    } else {
      setIsAgreementFormErr((prev) => ({ ...prev, accPrivacyErr: false }));
    }
    if (!isBusinessEthicsChecked) {
      setIsAgreementFormErr((prev) => ({ ...prev, businessEthicsErr: true }));
    } else {
      setIsAgreementFormErr((prev) => ({ ...prev, businessEthicsErr: false }));
    }

    if (
      isTermServiceChecked &&
      isAcceptPrivacyChecked &&
      isBusinessEthicsChecked
    )
      router.push("/register/vender");
  }

  const setIsTermServiceChecked = (val: boolean) => {
    dispatch(
      setAgreementForm({
        isAcceptPrivacyChecked,
        isBusinessEthicsChecked,
        isTermServiceChecked: val,
      })
    );
  };
  const setIsAcceptPrivacyChecked = (val: boolean) => {
    dispatch(
      setAgreementForm({
        isAcceptPrivacyChecked: val,
        isBusinessEthicsChecked,
        isTermServiceChecked,
      })
    );
  };
  const setIsBusinessEthicsChecked = (val: boolean) => {
    dispatch(
      setAgreementForm({
        isAcceptPrivacyChecked,
        isBusinessEthicsChecked: val,
        isTermServiceChecked,
      })
    );
  };

  return (
    <div className='pt-[3.8rem]'>
      <Heading
        title='TERI - Tender Management'
        description='A platform for venders to bid'
        keywords='Tender, Vender, Projects'
      />

      <div className='flex justify-center items-center'>
        <div className='mt-8 max-w-[65rem] w-full'>
          <div className='flex justify-center px-10 pt-6 pb-8 shadow-md rounded-xl bg-card-color'>
            <div className='flex justify-center flex-col'>
              <div className='mx-5 mt-4'>
                <h1 className='font-medium text-gray-900 text-center text-2xl'>
                  Vender Registration
                </h1>
              </div>
              <div className='rounded-md my-3'>
                <h2 className=' text-lg mb-2 ml-2.5 text-gray-900'>
                  Agreement
                </h2>
                <p className='bg-white text-gray-700 rounded-md p-4'>
                  Please read the agreement carefully. By filling this form, you
                  agree to accept the terms and conditions.On successful
                  registration completion, you&apos;ll get the copy of agreement
                  to your registered email
                </p>
              </div>

              <div className=' my-4'>
                <h2 className='text-lg mb-2 ml-2.5 text-gray-900'>
                  Terms of Services
                </h2>
                <Textarea
                  className='bg-white text-base rounded-md p-4 text-gray-700 '
                  readOnly={true}
                  defaultValue={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nulla lobortis, semper quam quis, viverra lorem. In porttitor blandit tellus sit amet cursus. Integer iaculis arcu nulla, sit amet mollis orci pellentesque sit amet. Duis velit lacus, tempor eu sollicitudin vitae, consectetur et enim. Suspendisse euismod pellentesque lacus, bibendum commodo ipsum luctus nec. Proin tortor lorem, tincidunt nec odio eu, molestie consequat lectus. Integer cursus justo sed augue semper suscipit. Aenean finibus libero quis fermentum rhoncus. Nullam quis massa a nisl efficitur blandit. Duis malesuada volutpat vulputate. Suspendisse potenti. In interdum faucibus ipsum interdum mattis. Pellentesque fringilla mollis turpis in rhoncus. Quisque consectetur enim augue, sed blandit libero ullamcorper vel. Vivamus et diam ullamcorper, imperdiet dui interdum, egestas justo. Pellentesque id justo finibus, volutpat tortor id, lacinia dolor. Aenean congue velit ac leo euismod, nec convallis risus cursus. Aenean faucibus sem vitae tortor elementum, nec feugiat enim eleifend. Ut feugiat, ligula a aliquam bibendum, neque nibh condimentum ante, sed tincidunt nibh mauris ut purus. Duis fringilla cursus mauris, non pretium leo laoreet ut. Integer ut vestibulum sapien. Sed pharetra augue at eleifend mollis. Fusce ultricies porta mi, non lobortis metus interdum ultricies."
                  }
                  rows={4}
                />
              </div>
              <div className='my-3 flex flex-col gap-2 p-4'>
                <div className='flex items-center'>
                  <Checkbox
                    id='term-service'
                    className='mr-2 data-[state=checked]:bg-blue-600 border-blue-400'
                    checked={isTermServiceChecked}
                    onCheckedChange={(val) =>
                      setIsTermServiceChecked(val as boolean)
                    }
                  />
                  <label htmlFor='term-service'>
                    I agree to Terms of Service
                  </label>
                  {isAgreementFormErr.termErr && (
                    <p className='text-red-500 text-[0.85rem] ml-4'>
                      Please check the box before submit
                    </p>
                  )}
                </div>
                <div className='flex items-center'>
                  <Checkbox
                    id='accept-privacy'
                    className='mr-2 data-[state=checked]:bg-blue-600 border-blue-400'
                    checked={isAcceptPrivacyChecked}
                    onCheckedChange={(val) =>
                      setIsAcceptPrivacyChecked(val as boolean)
                    }
                  />
                  <label htmlFor='accept-privacy'>
                    I read and accept Privacy and Data Sharing Policies
                  </label>
                  {isAgreementFormErr.accPrivacyErr && (
                    <p className='text-red-500 text-[0.85rem] ml-4'>
                      Please check the box before submit
                    </p>
                  )}
                </div>
                <div className='flex items-center'>
                  <Checkbox
                    id='business-ethics'
                    className='mr-2 data-[state=checked]:bg-blue-600 border-blue-400'
                    checked={isBusinessEthicsChecked}
                    onCheckedChange={(val) =>
                      setIsBusinessEthicsChecked(val as boolean)
                    }
                  />
                  <label htmlFor='business-ethics'>
                    I read and promise to follow Business Ethics and Codes
                  </label>
                  {isAgreementFormErr.businessEthicsErr && (
                    <p className='text-red-500 text-[0.85rem] ml-4'>
                      Please check the box before submit
                    </p>
                  )}
                </div>
              </div>

              <div className='flex justify-end'>
                <Button
                  onClick={handleAgreementForm}
                  className='mt-6 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'>
                  Submit & Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
