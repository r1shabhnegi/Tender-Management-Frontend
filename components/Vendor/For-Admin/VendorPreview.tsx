"use client";
import React, { FC } from "react";
import {
  Edit,
  Mail,
  Phone,
  Calendar,
  User,
  Briefcase,
  MapPin,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/helper";
import { useGetVendorDetailsQuery } from "@/Redux/vendor/vendorApi";
import { useRouter } from "next/navigation";
import InfoCard from "@/components/Shared/InfoCard";
import PageError from "@/components/Shared/PageError";
import PageLoading from "@/components/Shared/PageLoading";

interface InfoItemProps {
  label: string;
  value: string;
  isUrl?: boolean;
}

interface Props {
  vendorId: string;
}

interface VendorData {
  user: {
    id: string;
    fullname: string;
    email: string;
    role: string;
    status: string;
    phoneNumber: string;
    panCardNumber: string;
    panCardDoc: string;
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
    registrationDoc: string;
  };
}
const InfoItem: React.FC<InfoItemProps> = ({ label, value, isUrl = false }) => {
  return (
    <div className='flex flex-col sm:flex-row sm:justify-between py-2'>
      <div className='text-sm font-medium text-gray-700  mb-1 sm:mb-0'>
        {label}
      </div>
      <div className='text-right text-gray-900 sm:text-left font-medium'>
        {isUrl ? (
          <a
            href={value}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary inline-flex items-center hover:underline'>
            View Document
          </a>
        ) : (
          <span>{value || "Not provided"}</span>
        )}
      </div>
    </div>
  );
};

const VendorPreview: FC<Props> = ({ vendorId }) => {
  const { data, isLoading, isError } = useGetVendorDetailsQuery(vendorId);

  const router = useRouter();

  if (isLoading) return <PageLoading />;

  if (isError || data?.success === false) {
    return <PageError />;
  }

  const { user, business } = data?.vendorDetails as VendorData;

  return (
    <div className=''>
      <div className='mx-16  flex my-10 gap-2 flex-col items-center justify-center relative'>
        <h1 className='text-3xl text-gray-900 font-semibold'>Vendor Details</h1>
        <p className='text-gray-700'>
          View all information about the vendor and their business
        </p>

        <Button
          className='absolute left-0 top-0 bg-blue-200 text-gray-900'
          onClick={() => router.push(`/admin/vendors/edit/${vendorId}`)}>
          <ArrowLeft className='size' />
        </Button>
      </div>
      <div className='px-16 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-1 '>
          <div className='bg-card rounded-2xl shadow-sm p-6 mb-6 sticky top-28'>
            <div className=' flex  flex-col items-center text-center mb-6'>
              <div className='h-24 w-24 rounded-full bg-card-darker1 flex items-center justify-center mb-4'>
                <User className='h-12 w-12 text-gray-500' />
              </div>
              <h2 className='text-xl text-gray-900 font-bold'>
                {capitalizeFirstLetter(user?.fullname)}
              </h2>
              <p className='text-gray-900'>{user?.email}</p>
              <div className='mt-2'>
                <span
                  className={`font-medium border-[0.1rem] rounded-full text-[0.8rem] py-0.5 px-2 ${
                    user?.status === "pending"
                      ? "bg-orange-100  text-orange-700 border-orange-200"
                      : user?.status === "approved"
                      ? "bg-green-100  text-green-700 border-green-200"
                      : user?.status === "rejected"
                      ? "bg-red-100  text-red-700 border-red-200"
                      : ""
                  }`}>
                  {capitalizeFirstLetter(user?.status)}
                </span>
              </div>
            </div>

            <div className='space-y-3 text-sm'>
              <div className='flex items-center'>
                <Phone className='h-4 w-4 mr-2 text-gray-900 ' />
                <span className='text-gray-900'>{user?.phoneNumber}</span>
              </div>
              <div className='flex items-center'>
                <Mail className='h-4 w-4 mr-2 text-gray-900 ' />
                <span className='text-gray-900'>{user?.email}</span>
              </div>
              <div className='flex items-center'>
                <Briefcase className='h-4 w-4 mr-2  text-gray-900 ' />
                <span className='text-gray-900'>
                  {capitalizeFirstLetter(business?.businessName)}
                </span>
              </div>
              <div className='flex items-center'>
                <MapPin className='h-4 w-4 mr-2 text-gray-900 ' />
                <span className='text-gray-900'>
                  {capitalizeFirstLetter(business?.city)},{" "}
                  {capitalizeFirstLetter(business?.country)}
                </span>
              </div>
              <div className='flex items-center'>
                <Calendar className=' h-4 w-4 mr-2 text-gray-900 ' />
                <span className='text-gray-900'>
                  Established {business?.establishedYear}
                </span>
              </div>
            </div>

            <div className='mt-6 pt-6 border-t'>
              <Button
                className='w-full rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center'
                onClick={() => router.push(`/admin/vendors/edit/${vendorId}`)}>
                <Edit className='mr-2 h-4 w-4' /> Edit Details
              </Button>
            </div>
          </div>
        </div>

        <div className='lg:col-span-2 space-y-6'>
          <InfoCard title='Vendor Profile'>
            <InfoItem
              label='Full Name'
              value={user?.fullname}
            />
            <InfoItem
              label='Contact Number'
              value={user?.phoneNumber}
            />
            <InfoItem
              label='PAN Card Number'
              value={user?.panCardNumber}
            />
            <InfoItem
              label='PAN Card Document'
              value={user?.panCardDoc}
              isUrl
            />
            <InfoItem
              label='Status'
              value={capitalizeFirstLetter(user?.status)}
            />
            <InfoItem
              label='Account Created'
              value={new Date(user?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          </InfoCard>

          <InfoCard title='Business Information'>
            <InfoItem
              label='Business Name'
              value={business?.businessName}
            />
            <InfoItem
              label='Classification'
              value={business?.businessClassification}
            />
            <InfoItem
              label='Registration Number'
              value={business?.registrationNumber}
            />
            <InfoItem
              label='Registration Document'
              value={business?.registrationDoc}
              isUrl
            />
            <InfoItem
              label='Established Year'
              value={business?.establishedYear}
            />
          </InfoCard>

          <InfoCard title='Business Address'>
            <InfoItem
              label='Address Line 1'
              value={business?.addressLineOne}
            />
            <InfoItem
              label='Address Line 2'
              value={business?.addressLineTwo}
            />
            <InfoItem
              label='Locality'
              value={business?.locality}
            />
            <InfoItem
              label='City'
              value={capitalizeFirstLetter(business?.city)}
            />
            <InfoItem
              label='PIN Code'
              value={business?.pinCode}
            />
            <InfoItem
              label='Country'
              value={capitalizeFirstLetter(business?.country)}
            />
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default VendorPreview;
