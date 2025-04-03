"use client";
import React, { useState, useEffect, FC } from "react";
import { Save, ArrowLeft, FileText } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import InfoCard from "@/components/Shared/InfoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { formLabelStyle, inputStyle } from "@/app/Styles";

import PdfViewerModal from "@/components/Shared/PdfViewerModal";
import { businessClassification } from "@/lib/constants";

interface Props {
  vendorId: string;
  data: {
    vendorDetails: {
      user: {
        id: string;
        fullname: string;
        email: string;
        role: string;
        status: string;
        phoneNumber: string;
        panCardNumber: string;
        panCardDoc: null;
        createdAt: string;
      };
      business: {
        id: string;
        businessName: string;
        businessClassification: string;
        registrationNumber: string;
        establishedYear: string;
        addressLineOne: string;
        addressLineTwo: string;
        locality: string;
        city: string;
        pinCode: string;
        country: string;
        registrationDoc: null;
      };
    };
  };
}

const VendorDetailsWithCategories: FC<Props> = ({ data }) => {
  const [isPdfModal, setIsPdfModal] = useState(false);
  const [isViewFile, setIsViewFile] = useState<
    string | ArrayBuffer | Blob | null
  >(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: {
        id: "",
        fullname: "",
        email: "",
        role: "",
        status: "",
        phoneNumber: "",
        panCardNumber: "",
        panCardDoc: null,
        createdAt: "",
      },
      business: {
        id: "",
        businessName: "",
        businessClassification: "",
        registrationNumber: "",
        establishedYear: "",
        addressLineOne: "",
        addressLineTwo: "",
        locality: "",
        city: "",
        pinCode: "",
        country: "",
        registrationDoc: null,
      },
    },
  });

  // const {
  //   data,
  //   isLoading: vendorDataLoading,
  //   isError,
  //   error,
  // } = useGetVendorDetailsQuery(vendorId);

  useEffect(() => {
    if (data) {
      const vendorDetails = data?.vendorDetails;

      setValue("user.id", vendorDetails.user.id);
      setValue("user.fullname", vendorDetails.user.fullname);
      setValue("user.status", vendorDetails.user.status);
      setValue("user.phoneNumber", vendorDetails.user.phoneNumber);
      setValue("user.panCardNumber", vendorDetails.user.panCardNumber);
      setValue("user.panCardDoc", vendorDetails.user.panCardDoc);
      setValue("user.createdAt", vendorDetails.user.createdAt);

      setValue("business.id", vendorDetails.business.id);
      setValue("business.businessName", vendorDetails.business.businessName);
      setValue(
        "business.businessClassification",
        vendorDetails.business.businessClassification
      );
      setValue(
        "business.registrationNumber",
        vendorDetails.business.registrationNumber
      );
      setValue(
        "business.establishedYear",
        vendorDetails.business.establishedYear
      );
      setValue(
        "business.addressLineOne",
        vendorDetails.business.addressLineOne
      );
      setValue(
        "business.addressLineTwo",
        vendorDetails.business.addressLineTwo
      );
      setValue("business.locality", vendorDetails.business.locality);
      setValue("business.city", vendorDetails.business.city);
      setValue("business.pinCode", vendorDetails.business.pinCode);
      setValue("business.country", vendorDetails.business.country);
      setValue(
        "business.registrationDoc",
        vendorDetails.business.registrationDoc
      );

      setValue("user.panCardDoc", vendorDetails.user.panCardDoc);
      setValue(
        "business.registrationDoc",
        vendorDetails.business.registrationDoc
      );

      // setPanCardDocUrl(vendorDetails.user.panCardDoc);
      // setRegistrationDocUrl(vendorDetails.business.registrationDoc);
    }
  }, [data, setValue]);

  const watchPanCard = watch("user.panCardDoc");
  const watchRegistrationDoc = watch("business.registrationDoc");

  async function handleViewPdf(file: string | ArrayBuffer | Blob | null) {
    setIsViewFile(file);
    setIsPdfModal(true);
  }
  const showErrorMessage = (fieldName: string) => {
    const getNestedError = (path: string) => {
      const parts = path.split(".");
      let current: Record<string, unknown> = errors;

      for (const part of parts) {
        if (!current || typeof current !== "object") return undefined;
        current = current[part] as Record<string, unknown>;
      }

      return current;
    };

    const error = getNestedError(fieldName);
    return error ? (
      <p className='text-red-600 text-[0.85rem] ml-0.5 mt-1'>
        {error.message as string}
      </p>
    ) : null;
  };

  console.log(watchPanCard);

  function onSubmit() {}

  return (
    <div className='relative m-5'>
      {false ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700'></div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-4xl mx-auto'>
          <div className='space-y-8'>
            <div>
              <InfoCard title='Vendor Profile'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='full_name'>
                      Full Name
                    </label>
                    <Input
                      className={inputStyle}
                      id='full_name'
                      {...register("user.fullname", {
                        required: "Full name is required",
                      })}
                    />
                    {showErrorMessage("user.fullname")}
                  </div>

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='status'>
                      Account Status
                    </label>
                    <Select
                      value={watch("user.status")}
                      onValueChange={(value) => setValue("user.status", value)}>
                      <SelectTrigger
                        className={inputStyle}
                        id='status'>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='pending'>Pending</SelectItem>
                        <SelectItem value='approved'>Approved</SelectItem>
                        <SelectItem value='rejected'>Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='contact_number'>
                      Contact Number
                    </label>
                    <Input
                      className={inputStyle}
                      id='contact_number'
                      {...register("user.phoneNumber", {
                        required: "Contact number is required",
                      })}
                    />
                    {showErrorMessage("user.phoneNumber")}
                  </div>

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='pan_card_number'>
                      PAN Card Number
                    </label>
                    <Input
                      className={inputStyle}
                      id='pan_card_number'
                      {...register("user.panCardNumber", {
                        required: "PAN card number is required",
                      })}
                    />
                    {showErrorMessage("user.panCardNumber")}
                  </div>

                  {/* <div className='space-y-2'>
                    <label htmlFor='pan_card_doc'>PAN Card Document</label>
                    <div className='flex items-center'>
                      <Button
                        type='button'
                        variant='outline'
                        className='w-full bg-blue-200 flex items-center justify-center'>
                        <Upload className='mr-2 h-4 w-4' />
                        View Document
                      </Button>
                    </div>
                  </div> */}
                </div>
              </InfoCard>
            </div>

            <div>
              <InfoCard title='Business Information'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='business_name'>
                      Business Name
                    </label>
                    <Input
                      className={inputStyle}
                      id='business_name'
                      {...register("business.businessName", {
                        required: "Business name is required",
                      })}
                    />
                    {errors.business?.businessName && (
                      <p className='text-red-600 text-xs mt-1'>
                        {errors.business.businessName.message}
                      </p>
                    )}
                  </div>

                  <div className='flex flex-col w-full justify-center'>
                    <label className={formLabelStyle}>
                      Business Classification
                    </label>
                    <Controller
                      name='business.businessClassification'
                      control={control}
                      rules={{
                        required: "Business classification is required",
                      }}
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

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='registration_number'>
                      Registration Number
                    </label>
                    <Input
                      className={inputStyle}
                      id='registration_number'
                      {...register("business.registrationNumber", {
                        required: "Registration number is required",
                      })}
                    />
                    {errors.business?.registrationNumber && (
                      <p className='text-red-600 text-xs mt-1'>
                        {errors.business.registrationNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='established_year'>
                      Established Year
                    </label>
                    <Input
                      className={inputStyle}
                      id='established_year'
                      {...register("business.establishedYear", {
                        required: "Established year is required",
                      })}
                    />
                    {errors.business?.establishedYear && (
                      <p className='text-red-600 text-xs mt-1'>
                        {errors.business.establishedYear.message}
                      </p>
                    )}
                  </div>
                </div>
              </InfoCard>
            </div>

            <div>
              <InfoCard title='Business Address'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2 md:col-span-2'>
                    <label
                      className={formLabelStyle}
                      htmlFor='address_line1'>
                      Address Line 1
                    </label>
                    <Input
                      className={inputStyle}
                      id='address_line1'
                      {...register("business.addressLineOne", {
                        required: "Address line 1 is required",
                      })}
                    />
                    {errors.business?.addressLineOne && (
                      <p className='text-red-600 text-xs mt-1'>
                        {errors.business.addressLineOne.message}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2 md:col-span-2'>
                    <label
                      className={formLabelStyle}
                      htmlFor='address_line2'>
                      Address Line 2
                    </label>
                    <Input
                      className={inputStyle}
                      id='address_line2'
                      {...register("business.addressLineTwo")}
                    />
                  </div>

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='locality'>
                      Locality
                    </label>
                    <Input
                      className={inputStyle}
                      id='locality'
                      {...register("business.locality", {
                        required: "Locality is required",
                      })}
                    />
                    {errors.business?.locality && (
                      <p className='text-red-600 text-xs mt-1'>
                        {errors.business.locality.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='city'>
                      City
                    </label>
                    <Input
                      className={inputStyle}
                      id='city'
                      {...register("business.city", {
                        required: "City is required",
                      })}
                    />
                    {errors.business?.city && (
                      <p className='text-red-600 text-xs mt-1'>
                        {errors.business.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='pin_code'>
                      PIN Code
                    </label>
                    <Input
                      className={inputStyle}
                      id='pin_code'
                      {...register("business.pinCode", {
                        required: "PIN code is required",
                      })}
                    />
                    {errors.business?.pinCode && (
                      <p className='text-red-600 text-xs mt-1'>
                        {errors.business.pinCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={formLabelStyle}
                      htmlFor='country'>
                      Country
                    </label>
                    <Input
                      className={inputStyle}
                      id='country'
                      {...register("business.country", {
                        required: "Country is required",
                      })}
                    />
                    {errors.business?.country && (
                      <p className='text-red-600 text-xs mt-1'>
                        {errors.business.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </InfoCard>
            </div>

            <div>
              <InfoCard title='Documents'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label
                      className={formLabelStyle}
                      htmlFor='pan_card_doc'>
                      PAN Card Document
                    </label>
                    <div className='flex items-center'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => handleViewPdf(watchPanCard)}
                        className='w-full rounded-lg bg-blue-200 flex items-center justify-center'>
                        <FileText className='mr-1' />
                        Pan-Card Document
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label
                      className={formLabelStyle}
                      htmlFor='registration_doc'>
                      Registration Document
                    </label>
                    <div className='flex items-center'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => handleViewPdf(watchRegistrationDoc)}
                        className='w-full rounded-lg bg-blue-200 flex items-center justify-center'>
                        <FileText className='mr-1' />
                        Registration Document
                      </Button>
                    </div>
                  </div>
                </div>
              </InfoCard>
            </div>

            <div className='flex justify-between pt-4 space-x-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.push("/admin/vendors")}
                className='flex items-center'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Cancel
              </Button>

              <Button
                type='submit'
                disabled={false}
                className='flex items-center bg-blue-600 hover:bg-blue-700 justify-center'>
                {false ? (
                  <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                ) : (
                  <>
                    <Save className='mr-2 size-5' />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
      {isPdfModal && (
        <PdfViewerModal
          file={isViewFile}
          setIsPdfModal={setIsPdfModal}
        />
      )}
    </div>
  );
};

export default VendorDetailsWithCategories;
