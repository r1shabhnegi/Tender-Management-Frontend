import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import BusinessInfo from "./RegistrationForms/BusinessInfo";
import VenderInfo from "./RegistrationForms/VenderInfo";
import VenderDocumentsInfo from "./RegistrationForms/VenderDocumentsInfo";
import { useRegisterVenderMutation } from "@/Redux/auth/authApi";
import { toast } from "sonner";
import { FileText, LoaderCircle, Building, FileUp, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetUploadUrlMutation } from "@/Redux/s3-files/s3-files-Api";
import axios from "axios";
import { generateUniqueId } from "@/lib/helper";
import { IVenderRegistrationForm } from "@/app/Types/User-Types";

const VenderRegistration = () => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [registerVender] = useRegisterVenderMutation();

  const router = useRouter();

  const [getUploadUrl] = useGetUploadUrlMutation();

  const methods = useForm<IVenderRegistrationForm>({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
      panCardNumber: "",
      panCardDoc: null,
      businessName: "",
      businessClassification: "",
      establishedYear: "",
      registrationNumber: "",
      addressLineOne: "",
      addressLineTwo: "",
      locality: "",
      city: "",
      pinCode: "",
      country: "",
      registrationDoc: null,
    },
  });

  const { handleSubmit, reset, trigger } = methods;

  const handleVenderMutate = handleSubmit(
    async (data: IVenderRegistrationForm) => {
      try {
        setIsLoading(true);
        const { panCardDoc, registrationDoc, ...restData } = data;
        let panCardFileName = "";
        let registrationDocFileName = "";
        if (panCardDoc) {
          try {
            const file =
              panCardDoc instanceof FileList ? panCardDoc[0] : panCardDoc;

            const fileName = generateUniqueId(file?.name);
            const response = await getUploadUrl({
              fileName: `${process.env.NEXT_PUBLIC_AWS_S3_PDF_FOLDER}/${fileName}`,
              contentType: file?.type,
            }).unwrap();

            if (response?.success && response?.uploadUrl) {
              await axios.put(response.uploadUrl, file);
              panCardFileName = fileName;
            } else {
              toast.error("Failed to upload pan card document");
              return;
            }
          } catch {
            toast.error("Failed to upload pan card document");
            return;
          }
        } else {
          toast.error("Please upload pan card document");
          return;
        }
        if (registrationDoc) {
          try {
            const file =
              registrationDoc instanceof FileList
                ? registrationDoc[0]
                : registrationDoc;

            const fileName = generateUniqueId(file?.name);
            const response = await getUploadUrl({
              fileName: `${process.env.NEXT_PUBLIC_AWS_S3_PDF_FOLDER}/${fileName}`,
              contentType: file?.type,
            }).unwrap();

            if (response?.success && response?.uploadUrl) {
              await axios.put(response.uploadUrl, file);
              registrationDocFileName = fileName;
            } else {
              toast.error("Failed to upload registration document");
              return;
            }
          } catch {
            toast.error("Failed to upload registration document");
            return;
          }
        } else {
          toast.error("Please upload registration document");
          return;
        }

        const formData = {
          ...restData,
          panCardDocName: panCardFileName,
          registrationDocName: registrationDocFileName,
        };
        const result = await registerVender(formData).unwrap();

        if (result.error) {
          toast.error("Error registering vender please try again");
          return;
        }

        router.push("/register/successful");
        toast.success("Form Submitted Successfully");
        reset();
      } catch (error) {
        console.log(error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  );

  const handleNextStep = async (nextStep: number) => {
    const isValid = await trigger();
    if (isValid) {
      setActive(nextStep);
    }
  };

  const registrationSteps = [
    {
      title: "Personal Information",
      icon: (
        <FileText
          size={18}
          className='text-primary'
        />
      ),
      description: "Basic account details",
    },
    {
      title: "Business Information",
      icon: (
        <Building
          size={18}
          className='text-primary'
        />
      ),
      description: "Company and address details",
    },
    {
      title: "Document Upload",
      icon: (
        <FileUp
          size={18}
          className='text-primary'
        />
      ),
      description: "Required verification documents",
    },
  ];

  const getProgressPercentage = () => {
    return Math.round((active / (registrationSteps.length - 1)) * 100);
  };

  return (
    <FormProvider {...methods}>
      <div className='bg-white shadow-sm border-b mb-8'>
        <div className='container mx-auto px-32 py-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Vendor Registration
          </h1>
          <p className='text-gray-600 mt-2 max-w-2xl'>
            Complete all the required information to register your company as a
            vendor. This multi-step form will guide you through the registration
            process.
          </p>

          <div className='mt-6 w-full h-2 bg-gray-100 rounded-full overflow-hidden'>
            <div
              className='h-full bg-primary transition-all duration-300 ease-in-out'
              style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>

          <div className='flex items-center justify-between mt-2'>
            <span className='text-sm font-medium text-gray-700'>
              Step {active + 1} of {registrationSteps.length}
            </span>
            <span className='text-sm font-medium text-gray-700'>
              {getProgressPercentage()}% Complete
            </span>
          </div>
        </div>
      </div>

      <div className='container mx-auto max-w-[72rem] px-6 flex justify-between gap-8 mb-12'>
        <div className='w-72 shrink-0'>
          <div className='sticky top-36 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
            <div className='p-4 bg-gray-50 border-b'>
              <h2 className='font-semibold text-gray-900'>
                Registration Steps
              </h2>
            </div>
            <div className='p-2'>
              {registrationSteps?.map((step, i) => (
                <div
                  key={step.title}
                  className={`flex items-start gap-3 hover:bg-gray-50 cursor-pointer rounded-lg p-3 transition-all
                   ${
                     active === i
                       ? "bg-primary/5 border-l-4 border-primary"
                       : ""
                   }`}
                  onClick={() => {
                    // Only allow going back to previous steps
                    if (i < active) setActive(i);
                  }}>
                  <div
                    className={`flex items-center justify-center rounded-full w-8 h-8 mt-0.5 ${
                      i < active
                        ? "bg-green-100 text-green-700"
                        : active === i
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                    {i < active ? <Check size={16} /> : step.icon}
                  </div>
                  <div>
                    <p
                      className={`font-medium text-sm ${
                        active === i ? "text-primary" : "text-gray-900"
                      }`}>
                      {step.title}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex-1 max-w-3xl'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
            {active === 0 && <VenderInfo handleNextStep={handleNextStep} />}
            {active === 1 && (
              <BusinessInfo
                handleNextStep={handleNextStep}
                setActive={setActive}
              />
            )}
            {active === 2 && (
              <VenderDocumentsInfo
                handleNextStep={handleNextStep}
                handleVenderMutate={handleVenderMutate}
                setActive={setActive}
              />
            )}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className='flex z-[1000] flex-col items-center justify-center bg-gray-950/75 fixed top-0 left-0 w-full h-full'>
          <p className='text-gray-400 text-xl mb-1'>Please wait</p>
          <h1 className='text-gray-300 mb-8 text-3xl'>Registering Vendor</h1>
          <LoaderCircle
            className='text-gray-400 animate-spin'
            size={30}
          />
        </div>
      )}
    </FormProvider>
  );
};

export default VenderRegistration;
