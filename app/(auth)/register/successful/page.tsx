"use client";
import { Button } from "@/components/ui/button";
import { setAgreementForm } from "@/Redux/vendor/venderRegistrationSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const RegistrationPendingMsg = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setAgreementForm({
        isTermServiceChecked: false,
        isAcceptPrivacyChecked: false,
        isBusinessEthicsChecked: false,
      })
    );
  }, [dispatch]);

  return (
    <div className='pt-[3.5rem] flex justify-center items-center'>
      <div className='bg-card max-w-[35rem] w-full mt-20 p-10 rounded-xl'>
        <h2 className='text-center font-bold text-2xl text-gray-900'>
          We will get back to you in 24 to 72 hours
        </h2>
        <p className='text-center font-medium text-gray-700 text-xl mt-5'>
          Please, be patient!😊
        </p>

        <Link href={"/"}>
          <Button className='w-full mt-20 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-full'>
            Get back to the Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPendingMsg;
