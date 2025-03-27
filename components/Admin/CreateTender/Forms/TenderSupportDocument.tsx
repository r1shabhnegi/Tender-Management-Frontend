"use client";
import { formLabelStyle, inputStyle } from "@/app/Styles";
import PdfViewerModal from "@/components/Shared/PdfViewerModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, FileUp, Plus, Trash } from "lucide-react";
import React, { FC, useState } from "react";
import { toast } from "sonner";
import { useFieldArray, useFormContext } from "react-hook-form";
import InfoCard from "@/components/Shared/InfoCard";

interface Props {
  setActive: (active: number) => void;
}

const TenderSupportDocument: FC<Props> = ({ setActive }) => {
  const { control, register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tenderSupportDocuments",
  });

  const [isPdfModal, setIsPdfModal] = useState(false);
  const [isViewFile, setIsViewFile] = useState<
    string | ArrayBuffer | Blob | null
  >(null);

  function addDocument() {
    const documents = watch("tenderSupportDocuments");
    const lastDocument = documents[documents.length - 1];

    if (
      lastDocument.document &&
      lastDocument.documentName &&
      lastDocument.documentPurpose
    ) {
      append({ documentName: "", documentPurpose: "", document: "" });
    } else {
      toast.error(
        "Please fill in the previous document details before adding a new one."
      );
    }
  }

  // const handleDragOver = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   setDragging(true);
  // };

  // const handleDragLeave = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   setDragging(false);
  // };

  // const handleDrop = (e: React.DragEvent, index: number) => {
  //   e.preventDefault();
  //   setDragging(false);
  //   const files = e.dataTransfer.files;
  //   if (files.length > 0) {
  //     // Set file via React Hook Form setValue
  //     const fileInputName = `tenderSupportDocuments.${index}.document`;
  //     control._formValues[fileInputName] = files[0];
  //   }
  // };

  function handleViewPdf(file: string | ArrayBuffer | Blob | null) {
    setIsViewFile(file);
    setIsPdfModal(true);
  }

  return (
    <InfoCard
      title='Tender Support Documents'
      information='Add the documents that you want the bidders to submit.'>
      <div className='flex justify-end'>
        <Button
          type='button'
          variant={"outline"}
          // className='bg-blue-600 hover:bg-blue-700'
          onClick={addDocument}>
          <Plus /> Add
        </Button>
      </div>
      <div>
        {fields.map((field, i) => (
          <div
            key={field.id}
            className='pt-5 pb-10'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-lg font-medium'>Document {i + 1}</h2>

              {fields.length > 1 && (
                <a
                  onClick={() => remove(i)}
                  className='cursor-pointer '>
                  <Trash className='size-5' />
                </a>
              )}
            </div>
            <div className='flex justify-center gap-5'>
              <div className='flex flex-col gap-5 flex-1'>
                <div>
                  <label
                    className={`${formLabelStyle}`}
                    htmlFor={`tenderSupportDocuments.${i}.documentName`}>
                    Document Name
                  </label>
                  <Input
                    className={inputStyle}
                    {...register(`tenderSupportDocuments.${i}.documentName`)}
                    placeholder='Enter document name'
                  />
                </div>
                <div>
                  <label
                    className={`${formLabelStyle}`}
                    htmlFor={`tenderSupportDocuments.${i}.documentPurpose`}>
                    Document Purpose
                  </label>
                  <Textarea
                    rows={4}
                    className={inputStyle}
                    {...register(`tenderSupportDocuments.${i}.documentPurpose`)}
                    placeholder='Enter document purpose'
                  />
                </div>
              </div>
              <div>
                <label className={formLabelStyle}>Document</label>

                <Card className='w-[20rem] flex shadow-none items-center justify-center'>
                  <CardContent className='p-0 w-full'>
                    <div className='text-sm m-5'>
                      <label
                        htmlFor={`file-${i}`}
                        className={formLabelStyle}>
                        <span className='text-gray-700'>PDF Upload</span>
                        <div className='flex flex-col mt-2 gap-1'>
                          <Input
                            id={`file-${i}`}
                            type='file'
                            className='hidden'
                            placeholder='File'
                            accept='application/pdf'
                            {...register(
                              `tenderSupportDocuments.${i}.document`
                            )}
                          />

                          {watch(`tenderSupportDocuments.${i}.document[0]`) ? (
                            <div>
                              <div className='border-2 border-dashed p-4 cursor-pointer border-green-400 bg-green-50 rounded-lg flex flex-col gap-2 items-center justify-center'>
                                <p className='line-clamp-1 text-green-600 font-medium w-[14rem]'>
                                  {
                                    watch(
                                      `tenderSupportDocuments.${i}.document[0]`
                                    ).name
                                  }
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
                      {watch(`tenderSupportDocuments.${i}.document[0]`) && (
                        <div className='mt-3.5 w-full flex justify-center items-center'>
                          <Button
                            type='button'
                            onClick={() =>
                              handleViewPdf(
                                watch(`tenderSupportDocuments.${i}.document[0]`)
                              )
                            }
                            className='w-ful hover:bg-blue-300 text-gray-900 bg-blue-200 rounded-lg'>
                            <Eye /> View PDF
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}
        <div className='flex justify-between'>
          <Button
            type='button'
            className='bg-blue-200 text-gray-900 rounded-lg font-semibold hover:bg-blue-300 transition-colors duration-300'
            onClick={() => setActive(0)}>
            Previous
          </Button>
          {/* <Button type='button'>Reset</Button> */}
          <Button
            type='button'
            className='bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'
            onClick={() => setActive(2)}>
            Next
          </Button>
        </div>
      </div>

      {isPdfModal && (
        <PdfViewerModal
          file={isViewFile}
          setIsPdfModal={setIsPdfModal}
        />
      )}
    </InfoCard>
  );
};

export default TenderSupportDocument;
