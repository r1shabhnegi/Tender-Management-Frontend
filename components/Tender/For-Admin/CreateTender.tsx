"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ItemInfo from "./CreateTenderCards/ItemInfo";
import TenderSupportDocument from "./CreateTenderCards/TenderSupportDocument";
import VenderDocRequirement from "./CreateTenderCards/VenderDocRequirement";
import KeyDates from "./CreateTenderCards/KeyDates";
import TenderFeeDetails from "./CreateTenderCards/TenderFeeDetails";
import TenderPreQualifications from "./CreateTenderCards/TenderPreQualifications";
import CreateTenderPreview from "./CreateTenderCards/CreateTenderPreview";
import { useCreateTenderMutation } from "@/Redux/tender/tenderApi";
import { toast } from "sonner";
import { useGetCategoriesNamesQuery } from "@/Redux/category/categoryApi";
import AdminPagesWrapper from "@/components/Admin/AdminPagesWrapper";
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
import {
  Check,
  FileText,
  Calendar,
  Coins,
  Award,
  Users,
  Eye,
  File,
} from "lucide-react";

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
    {
      title: "Primary information",
      icon: (
        <FileText
          size={18}
          className='text-primary'
        />
      ),
      description: "Basic tender details and requirements",
    },
    {
      title: "Required files",
      icon: (
        <File
          size={18}
          className='text-primary'
        />
      ),
      description: "Upload supporting documents",
    },
    {
      title: "Required submissions",
      icon: (
        <Users
          size={18}
          className='text-primary'
        />
      ),
      description: "Documents vendors need to submit",
    },
    {
      title: "Bid deadlines",
      icon: (
        <Calendar
          size={18}
          className='text-primary'
        />
      ),
      description: "Important dates and timeline",
    },
    {
      title: "Fee details",
      icon: (
        <Coins
          size={18}
          className='text-primary'
        />
      ),
      description: "Tender fees and payment information",
    },
    {
      title: "Eligibility details",
      icon: (
        <Award
          size={18}
          className='text-primary'
        />
      ),
      description: "Vendor qualification requirements",
    },
    {
      title: "Review & Publish",
      icon: (
        <Eye
          size={18}
          className='text-primary'
        />
      ),
      description: "Final preview and tender publishing",
    },
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

  const getProgressPercentage = () => {
    return Math.round((active / (createTenderNavData.length - 1)) * 100);
  };

  return (
    <AdminPagesWrapper>
      <div className='w-full bg-white border-b mb-8'>
        <div className='container mx-auto px-6 py-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Create Tender</h1>
          <p className='text-gray-600 mt-2 max-w-2xl'>
            Fill in the required information through this multi-step form to
            create a new tender. Complete all sections to ensure your tender
            meets all compliance requirements.
          </p>

          <div className='mt-6 w-full h-2 bg-gray-100 rounded-full overflow-hidden'>
            <div
              className='h-full bg-primary transition-all duration-300 ease-in-out'
              style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>

          <div className='flex items-center justify-between mt-2'>
            <span className='text-sm font-medium text-gray-700'>
              Step {active + 1} of {createTenderNavData.length}
            </span>
            <span className='text-sm font-medium text-gray-700'>
              {getProgressPercentage()}% Complete
            </span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 flex justify-between gap-8 h-full'>
        <div className='w-80 shrink-0'>
          <div className='sticky top-36 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
            <div className='pt-4 pb-2 px-4 bg-gray-50 border-b'>
              <h2 className='font-semibold text-gray-900'>
                Tender Creation Steps
              </h2>
            </div>
            <div className='p-2'>
              {createTenderNavData?.map((data, i) => (
                <div
                  key={data.title}
                  className={`flex items-start gap-3 hover:bg-gray-50 cursor-pointer rounded p-3 transition-all
                   ${
                     active === i
                       ? "bg-primary/5 border-l-4 border-primary"
                       : ""
                   }`}
                  onClick={() => setActive(i)}>
                  <div
                    className={`flex items-center justify-center rounded-full w-8 h-8 mt-0.5 ${
                      i < active
                        ? "bg-green-100 text-green-700"
                        : active === i
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                    {i < active ? <Check size={16} /> : data.icon}
                  </div>
                  <div>
                    <p
                      className={`font-medium text-sm ${
                        active === i ? "text-primary" : "text-gray-900"
                      }`}>
                      {data.title}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>
                      {data.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className='flex-1 max-w-3xl'>
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
