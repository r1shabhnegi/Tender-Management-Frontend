import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import BusinessInfo from "./RegistrationForms/BusinessInfo";
import VenderInfo from "./RegistrationForms/VenderInfo";
import VenderDocumentsInfo from "./RegistrationForms/VenderDocumentsInfo";
import { useRegisterVenderMutation } from "@/Redux/auth/authApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
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

            if (response?.isSuccess && response?.uploadUrl) {
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

            if (response?.isSuccess && response?.uploadUrl) {
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

  return (
    <FormProvider {...methods}>
      <form>
        <div className='flex justify-center items-center'>
          <div className='max-w-[55rem] w-full'>
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
      </form>
      {isLoading ? (
        <div className='flex z-[500] flex-col items-center justify-center bg-gray-950/75 fixed top-0 left-0 w-full h-full'>
          <p className='text-gray-400  text-xl mb-1'>
            Please wait
            <br />
          </p>
          <h1 className='text-gray-300 mb-8 text-3xl'>Registering Vender</h1>
          <LoaderCircle
            className='text-gray-400 animate-spin'
            size={30}
          />
        </div>
      ) : null}
    </FormProvider>
  );
};

export default VenderRegistration;
