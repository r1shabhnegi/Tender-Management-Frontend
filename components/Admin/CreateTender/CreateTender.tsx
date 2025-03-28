"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ItemInfo from "./Forms/ItemInfo";
import TenderSupportDocument from "./Forms/TenderSupportDocument";
import VenderDocRequirement from "./Forms/VenderDocRequirement";
import KeyDates from "./Forms/KeyDates";
import TenderFeeDetails from "./Forms/TenderFeeDetails";
import TenderPreQualifications from "./Forms/TenderPreQualifications";
import CreateTenderPreview from "./CreateTenderPreview";
import { useCreateTenderMutation } from "@/Redux/tender/tenderApi";
import { toast } from "sonner";
import { useGetCategoriesNamesQuery } from "@/Redux/category/categoryApi";
import AdminPagesWrapper from "../AdminPagesWrapper";
import { useGetUploadUrlMutation } from "@/Redux/s3-files/s3-files-Api";
import { generateUniqueId } from "@/lib/helper";
import axios from "axios";
import {
  IItemInfo,
  IKeyDate,
  ITenderFeeDetails,
  ITenderPreQualification,
  ITenderSupportDocument,
  IVenderDocRequirement,
} from "@/app/Types/Tender-Types";

// Validation function for tender data
const validateTenderData = (data: {
  itemInfo: IItemInfo;
  keyDates: IKeyDate;
  tenderFeeDetails: ITenderFeeDetails;
  tenderSupportDocuments: ITenderSupportDocument[];
  venderDocRequirement: IVenderDocRequirement[];
  tenderPreQualifications: ITenderPreQualification[];
}): boolean => {
  // Item Info validation
  const itemInfo = data.itemInfo;
  if (
    !itemInfo.company ||
    !itemInfo.department ||
    !itemInfo.tenderNumber ||
    !itemInfo.tenderType ||
    !itemInfo.tenderScope ||
    !itemInfo.category ||
    !itemInfo.title ||
    !itemInfo.description ||
    !itemInfo.technicalWeightage ||
    !itemInfo.commercialWeightage
  ) {
    return false;
  }

  // Key Dates validation
  const keyDates = data.keyDates;
  if (
    !keyDates.prePublishDate ||
    !keyDates.publishDate ||
    !keyDates.tenderSaleCloseDate ||
    !keyDates.clarificationStartDate ||
    !keyDates.clarificationEndDate ||
    !keyDates.revisionPublishmentDate ||
    !keyDates.bidSubmissionEndDate ||
    !keyDates.bidOpenDate
  ) {
    return false;
  }

  // Tender Fee Details validation
  const tenderFeeDetails = data.tenderFeeDetails;
  if (
    !tenderFeeDetails.documentFee ||
    !tenderFeeDetails.feePayableAt ||
    !tenderFeeDetails.EMD ||
    !tenderFeeDetails.emdPayableAt ||
    !tenderFeeDetails.tenderLocation ||
    !tenderFeeDetails.tenderValue
  ) {
    return false;
  }

  // Tender Support Documents validation
  const tenderSupportDocuments = data.tenderSupportDocuments;
  if (tenderSupportDocuments.length === 0) {
    return false;
  }
  for (const doc of tenderSupportDocuments) {
    if (!doc.documentName || !doc.documentPurpose || !doc.document) {
      return false;
    }
  }

  // Vendor Document Requirements validation
  const venderDocRequirement = data.venderDocRequirement;
  if (venderDocRequirement.length === 0) {
    return false;
  }
  for (const doc of venderDocRequirement) {
    if (!doc.name || !doc.type || !doc.purpose) {
      return false;
    }
  }

  // Tender Pre-Qualifications validation
  const tenderPreQualifications = data.tenderPreQualifications;
  if (tenderPreQualifications.length === 0) {
    return false;
  }
  for (const qual of tenderPreQualifications) {
    if (!qual.title || !qual.description || !qual.score) {
      return false;
    }
  }

  return true;
};

const CreateTender = () => {
  const [status, setStatus] = useState("");
  const [active, setActive] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [createTender, { isSuccess, isError, error }] =
    useCreateTenderMutation();

  const [getUploadUrl] = useGetUploadUrlMutation();

  const { data: categoriesData } = useGetCategoriesNamesQuery({});

  const methods = useForm({
    defaultValues: {
      // Item Info
      itemInfo: {
        company: "Teri",
        department: "",
        tenderNumber: "",
        tenderType: "",
        tenderScope: "",
        category: "",
        title: "",
        description: "",
        technicalPreBidQualification: "",
        technicalWeightage: "",
        commercialWeightage: "",
      },
      // Key Dates
      keyDates: {
        prePublishDate: "",
        publishDate: "",
        tenderSaleCloseDate: "",
        clarificationStartDate: "",
        clarificationEndDate: "",
        revisionPublishmentDate: "",
        bidSubmissionEndDate: "",
        bidOpenDate: "",
      },
      // Tender Fee Details

      tenderFeeDetails: {
        documentFee: "",
        feePayableAt: "",
        EMD: "",
        emdPayableAt: "",
        tenderLocation: "",
        tenderValue: "",
      },

      // Tender Support Documents
      tenderSupportDocuments: [
        {
          documentName: "",
          documentPurpose: "",
          document: "",
        },
      ],

      // Bidder Documents
      venderDocRequirement: [
        {
          name: "",
          type: "",
          purpose: "",
        },
      ],

      // Tender Pre-Qualifications
      tenderPreQualifications: [
        {
          title: "",
          description: "",
          score: "",
        },
      ],
    },
    mode: "onChange",
  });

  const isPreviewData = methods?.watch();

  // Track API response status
  useEffect(() => {
    if (isSuccess) {
      toast.success("Tender created successfully");
      methods.reset();
      setActive(0);
    } else if (isError) {
      console.log(error);
      toast.error("Technical error, Please try again later");
    }
  }, [isSuccess, isError, error, methods]);

  console.log(methods.watch());

  const onSubmit = async (data: {
    itemInfo: IItemInfo;
    keyDates: IKeyDate;
    tenderFeeDetails: ITenderFeeDetails;
    tenderSupportDocuments: ITenderSupportDocument[];
    venderDocRequirement: IVenderDocRequirement[];
    tenderPreQualifications: ITenderPreQualification[];
  }) => {
    try {
      const isVal = validateTenderData(data);
      if (!isVal) {
        toast.error("Please fill all required fields before publishing");
        return;
      }

      setIsLoading(true);

      const uploadPromises = data?.tenderSupportDocuments.map(
        async (doc: ITenderSupportDocument) => {
          try {
            const file = Array.isArray(doc.document)
              ? doc.document[0]
              : doc.document;
            const fileName = generateUniqueId(file.name);
            const response = await getUploadUrl({
              fileName: `${process.env.NEXT_PUBLIC_AWS_S3_PDF_FOLDER}/${fileName}`,
              contentType: file?.type,
            }).unwrap();

            if (response?.success && response?.uploadUrl) {
              await axios.put(response.uploadUrl, file);
              console.log("fileName", fileName);

              return {
                documentName: doc.documentName,
                documentPurpose: doc.documentPurpose,
                documentS3Name: fileName,
              };
            } else {
              toast.error(`Failed to upload ${doc.documentName} document`);
              return null;
            }
          } catch {
            toast.error(`Failed to upload ${doc.documentName} document`);
            return null;
          }
        }
      );

      let tenderSupportDocumentsNames: {
        documentName: string;
        documentPurpose: string;
        documentS3Name: string;
      }[] = [];

      try {
        const results = await Promise.all(uploadPromises);
        tenderSupportDocumentsNames = results.filter(
          (
            doc
          ): doc is {
            documentName: string;
            documentPurpose: string;
            documentS3Name: string;
          } => doc !== null
        );
      } catch (error) {
        console.error("Error uploading documents:", error);
        toast.error("Failed to upload one or more documents");
      }

      console.log("tenderSupportDocumentsNames", tenderSupportDocumentsNames);

      const formData = {
        ...data,
        itemInfo: {
          ...data.itemInfo,
          tenderNumber: data.itemInfo.tenderNumber.toString(),
          technicalWeightage: data.itemInfo.technicalWeightage.toString(),
          commercialWeightage: data.itemInfo.commercialWeightage.toString(),
        },
        tenderPreQualifications: data.tenderPreQualifications.map(
          (preQualification: ITenderPreQualification) => ({
            ...preQualification,
            score: preQualification.score.toString(),
          })
        ),
        tenderSupportDocuments: tenderSupportDocumentsNames,
        status: status,
      };

      const res = await createTender(formData).unwrap();
      console.log("res", res);
      if (res?.success) {
        toast.success("Tender created successfully");
        methods.reset();
        setActive(0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Technical error, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const createTenderNavData = [
    "Enter primary information",
    "Attach required files",
    "Specify required submissions.",
    "Specify important bid deadlines.",
    "Enter fee details.",
    "Enter eligibility details.",
    "Preview data before publishing.",
  ];

  const renderStep = () => {
    switch (active) {
      case 0:
        return (
          <ItemInfo
            setActive={setActive}
            categoriesData={categoriesData}
          />
        );
      case 1:
        return <TenderSupportDocument setActive={setActive} />;
      case 2:
        return <VenderDocRequirement setActive={setActive} />;
      case 3:
        return <KeyDates setActive={setActive} />;
      case 4:
        return <TenderFeeDetails setActive={setActive} />;
      case 5:
        return <TenderPreQualifications setActive={setActive} />;
      case 6:
        return (
          <CreateTenderPreview
            isLoading={isLoading}
            setActive={setActive}
            status={status}
            setStatus={setStatus}
            isPreviewData={isPreviewData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AdminPagesWrapper>
      <div className='mx-16 flex my-10 gap-2 flex-col items-center justify-center relative'>
        <h1 className='text-3xl text-gray-900 font-semibold'>Create Tender</h1>
        <p className='text-gray-700'>
          Fill in the required information to create a new tender
        </p>
      </div>

      <div className='flex justify-center gap-8 h-full'>
        <div
          className='max-w-[24%] w-full p-3 border border-blue-50 bg-card-color rounded-xl text-gray-900 overflow-auto flex flex-col gap-2.5 sticky top-36'
          style={{ height: "calc(100vh - 15rem)" }}>
          {createTenderNavData?.map((data, i) => (
            <div
              key={data}
              className={`hover:bg-card-color-darker1 cursor-pointer rounded-lg pl-4 pr-2.5 py-2.5 ${
                active === i ? "bg-card-color-darker1" : ""
              }`}
              onClick={() => setActive(i)}>
              <p className='font-medium text-sm flex items-center text-blue-800 '>
                Step {i + 1}
              </p>
              <p className='text-sm text-gray-700'>{data}</p>
            </div>
          ))}
        </div>
        {/* Main content */}
        <div className='flex-1'>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {renderStep()}
            </form>
          </FormProvider>
        </div>
      </div>
    </AdminPagesWrapper>
  );
};

export default CreateTender;
