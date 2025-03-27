import { formLabelStyle } from "@/app/Styles";
import PdfViewerModal from "@/components/Shared/PdfViewerModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, FileUp } from "lucide-react";
import React, { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  handleNextStep: (active: number) => void;
  handleVenderMutate: () => void;
  setActive: (active: number) => void;
}

interface FormValues {
  panCardDoc: FileList | null;
  registrationDoc: FileList | null;
}

const VenderDocumentsInfo: FC<Props> = ({ handleVenderMutate, setActive }) => {
  const [isPdfModal, setIsPdfModal] = useState(false);
  const [isViewFile, setIsViewFile] = useState<
    string | ArrayBuffer | Blob | null
  >(null);

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<FormValues>();

  const watchPanCard = watch("panCardDoc");
  const watchRegistrationDoc = watch("registrationDoc");

  async function handleViewPdf(file: string | ArrayBuffer | Blob | null) {
    setIsViewFile(file);
    setIsPdfModal(true);
  }

  const showErrorMessage = (fieldName: keyof typeof errors) => {
    return errors[fieldName] ? (
      <p className='text-red-600 text-xs mt-1'>
        {errors[fieldName]?.message as string}
      </p>
    ) : null;
  };

  return (
    <div className='flex justify-center'>
      <div className='rounded-xl drop-shadow bg-card-color w-full flex justify-center my-10 flex-col'>
        <div className='mt-8'>
          <h1 className='font-medium text-2xl text-center'>
            Vendor Registration
          </h1>
        </div>

        <div className='rounded-md p-4 mx-4 mt-4'>
          <h2 className='text-lg mb-5 ml-2.5 border-b-[1px] pb-4 border-gray-300'>
            <span className='text-blue-600 font-semibold'>Step 3</span>:
            Documents
          </h2>
          <p className='bg-white flex items-start rounded-lg  px-6 py-6'>
            <span className='font-semibold text-gray-900 mr-1'>Note:</span>
            <span className='text-gray-700'>
              This is the Final step, Please self-attest the documents by
              signing them, adding the current date, and attaching them to your
              submission.
            </span>
          </p>
        </div>

        <div className='flex items-center justify-evenly'>
          <div className='w-1/2 p-4 flex items-center justify-center flex-col gap-5'>
            <div className='w-[20rem] ml-1'>
              <label className={formLabelStyle}>Pan-Card Document</label>
              <p className='text-[0.82rem] ml-0.5 mt-2 font-medium text-gray-700'>
                Upload scanned copy of PAN Card with self attestation with
                current date.
              </p>
            </div>

            <Card className='w-[20rem] flex shadow-none items-center justify-center'>
              <CardContent className='p-0 w-full'>
                <div className='text-sm m-5'>
                  <label
                    htmlFor={`file_panCard`}
                    className={formLabelStyle}>
                    <span className='text-gray-700'>PDF Upload</span>
                    <div className='flex flex-col mt-2 gap-1'>
                      <Controller
                        name='panCardDoc'
                        control={control}
                        rules={{
                          required: "Please upload your PAN card document.",
                          validate: {
                            isPdf: (value) =>
                              !value ||
                              value[0]?.type === "application/pdf" ||
                              "Please select a PDF file.",
                            fileSize: (value) =>
                              !value ||
                              value[0]?.size <= 5 * 1024 * 1024 ||
                              "File size should not exceed 5MB.",
                          },
                        }}
                        render={({ field: { onChange, ref } }) => (
                          <Input
                            id={`file_panCard`}
                            type='file'
                            className='hidden'
                            placeholder='File'
                            accept='application/pdf'
                            ref={ref}
                            onChange={(e) => {
                              onChange(e.target.files);
                            }}
                          />
                        )}
                      />
                      {showErrorMessage("panCardDoc")}

                      {watchPanCard?.[0] ? (
                        <div>
                          <div className='border-2 border-dashed p-4 cursor-pointer border-green-400 bg-green-50 rounded-lg flex flex-col gap-2 items-center justify-center'>
                            <p className='line-clamp-1 text-green-600 font-medium w-[14rem]'>
                              {watchPanCard[0].name}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className='border-2 border-dashed p-4 cursor-pointer border-gray-300 rounded-lg flex flex-col gap-2 items-center justify-center'>
                          <FileUp className='w-10 h-10 text-gray-400' />
                          <p className='text-center text-sm font-medium text-gray-700 flex flex-col'>
                            <span>Click to upload PDF</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                  {watchPanCard?.[0] && (
                    <div className='mt-3.5 w-full flex justify-center items-center'>
                      <Button
                        type='button'
                        onClick={() => handleViewPdf(watchPanCard[0])}
                        className='w-full hover:bg-blue-300 text-gray-900 bg-blue-200 rounded-lg'>
                        <Eye /> View PDF
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='w-1/2 p-4 flex items-center justify-center flex-col gap-5'>
            <div className='w-[20rem] ml-1'>
              <label className={formLabelStyle}>
                Company Registration Document
              </label>
              <p className='text-[0.82rem] ml-0.5 mt-2 font-medium text-gray-700'>
                Upload scanned copy of Registration Certificate with self
                attestation with current date
              </p>
            </div>

            <Card className='w-[20rem] flex shadow-none items-center justify-center'>
              <CardContent className='p-0 w-full'>
                <div className='text-sm m-5'>
                  <label
                    htmlFor={`file_companyRegistration`}
                    className=''>
                    <span className='text-gray-700'>PDF Upload</span>

                    <div className='flex flex-col mt-2 gap-1'>
                      <Controller
                        name='registrationDoc'
                        control={control}
                        rules={{
                          required:
                            "Please upload your Company Registration document.",
                          validate: {
                            isPdf: (value) =>
                              !value ||
                              value[0]?.type === "application/pdf" ||
                              "Please select a PDF file.",
                            fileSize: (value) =>
                              !value ||
                              value[0]?.size <= 5 * 1024 * 1024 ||
                              "File size should not exceed 5MB.",
                          },
                        }}
                        render={({ field: { onChange, ref } }) => (
                          <Input
                            id={`file_companyRegistration`}
                            type='file'
                            className='hidden'
                            placeholder='File'
                            accept='application/pdf'
                            ref={ref}
                            onChange={(e) => {
                              onChange(e.target?.files);
                            }}
                          />
                        )}
                      />
                      {showErrorMessage("registrationDoc")}

                      {watchRegistrationDoc?.[0] ? (
                        <div>
                          <div className='border-2 border-dashed p-4 cursor-pointer border-green-400 bg-green-50 rounded-lg flex flex-col gap-2 items-center justify-center'>
                            <p className='line-clamp-1 text-green-600 font-medium w-[14rem]'>
                              {watchRegistrationDoc[0].name}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className='border-2 border-dashed p-4 cursor-pointer border-gray-300 rounded-lg flex flex-col gap-2 items-center justify-center'>
                          <FileUp className='w-10 h-10 text-gray-400' />
                          <p className='text-center text-sm font-medium text-gray-700 flex flex-col'>
                            <span>Click to upload PDF</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                  {watchRegistrationDoc?.[0] && (
                    <div className='mt-3.5 w-full flex justify-center items-center'>
                      <Button
                        type='button'
                        onClick={() => handleViewPdf(watchRegistrationDoc[0])}
                        className='w-full hover:bg-blue-300 text-gray-900 bg-blue-200 rounded-lg'>
                        <Eye /> View PDF
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='flex gap-5 px-16 pb-8 mt-6 items-center justify-between'>
          <Button
            type='button'
            onClick={() => setActive(1)}
            className='bg-blue-200 rounded-lg hover:bg-blue-300  font-semibold text-gray-900 transition-colors duration-300'>
            Previous
          </Button>
          <Button
            type='button'
            onClick={handleVenderMutate}
            className='bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'>
            Register Vender
          </Button>
        </div>
      </div>
      {isPdfModal && (
        <PdfViewerModal
          file={isViewFile}
          setIsPdfModal={setIsPdfModal}
        />
      )}
    </div>
  );
};

export default VenderDocumentsInfo;
