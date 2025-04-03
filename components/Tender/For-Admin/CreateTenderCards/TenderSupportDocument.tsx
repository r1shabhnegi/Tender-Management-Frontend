import { formLabelStyle, inputStyle } from "@/app/Styles";
import PdfViewerModal from "@/components/Shared/PdfViewerModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  File,
  FileUp,
  HelpCircle,
  Plus,
  Trash2,
} from "lucide-react";
import React, { FC, useState } from "react";
import { toast } from "sonner";
import {
  FieldErrors,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import InfoCard from "@/components/Shared/InfoCard";

interface Props {
  setActive: (active: number) => void;
}

const TenderSupportDocument: FC<Props> = ({ setActive }) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tenderSupportDocuments",
  });

  const [isPdfModal, setIsPdfModal] = useState(false);
  const [isViewFile, setIsViewFile] = useState<
    string | ArrayBuffer | Blob | null
  >(null);

  // Helper function to safely get error messages
  const getErrorMessage = (path: string) => {
    // Type-safe way to get nested errors
    const pathParts = path.split(".");
    let current: FieldErrors<FieldValues> | undefined = errors;

    // Navigate the error object path
    for (const part of pathParts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part] as typeof current;
      } else {
        return undefined;
      }
    }

    return current?.message?.toString();
  };

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

  function handleViewPdf(file: string | ArrayBuffer | Blob | null) {
    setIsViewFile(file);
    setIsPdfModal(true);
  }

  return (
    <InfoCard
      title='Tender Supporting Documents'
      information='Add the documents that support this tender and will be made available to bidders'>
      <div className='space-y-6'>
        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start'>
          <HelpCircle
            size={20}
            className='text-blue-600 mr-3 mt-0.5 flex-shrink-0'
          />
          <div>
            <h3 className='font-medium text-blue-800 mb-1'>
              Supporting Documents Instructions
            </h3>
            <p className='text-sm text-blue-700'>
              Upload all relevant files that bidders will need to understand the
              tender requirements. These may include technical specifications,
              drawings, contract terms, or other reference materials.
            </p>
          </div>
        </div>

        <div className='flex justify-end'>
          <Button
            type='button'
            variant='outline'
            className='shadow-sm rounded-lg font-medium flex items-center gap-2 border-primary text-primary hover:bg-primary/5'
            onClick={addDocument}>
            <Plus size={16} /> Add Document
          </Button>
        </div>

        <div className='space-y-8'>
          {fields.map((field, i) => (
            <div
              key={field.id}
              className='bg-gray-50 rounded-xl border border-gray-200 overflow-hidden'>
              <div className='bg-gray-100 py-3 px-4 flex items-center justify-between'>
                <h2 className='font-medium text-gray-800 flex items-center'>
                  <File className='mr-2 size-4' /> Document {i + 1}
                  {watch(`tenderSupportDocuments.${i}.documentName`) && (
                    <span className='ml-2 text-gray-600 text-sm'>
                      - {watch(`tenderSupportDocuments.${i}.documentName`)}
                    </span>
                  )}
                </h2>

                {fields.length > 1 && (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50'
                    onClick={() => remove(i)}>
                    <Trash2
                      size={16}
                      className='mr-1'
                    />{" "}
                    Remove
                  </Button>
                )}
              </div>

              <div className='p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-5'>
                    <div className='space-y-2'>
                      <label
                        className={`${formLabelStyle} flex items-center gap-1`}
                        htmlFor={`tenderSupportDocuments.${i}.documentName`}>
                        Document Name
                        <span className='text-red-500'>*</span>
                      </label>
                      <Input
                        id={`tenderSupportDocuments.${i}.documentName`}
                        className={inputStyle}
                        {...register(
                          `tenderSupportDocuments.${i}.documentName`,
                          {
                            required: "Document name is required",
                          }
                        )}
                        placeholder='Enter a descriptive name for this document'
                      />
                      {getErrorMessage(
                        `tenderSupportDocuments.${i}.documentName`
                      ) && (
                        <p className='text-red-500 text-xs mt-1'>
                          {getErrorMessage(
                            `tenderSupportDocuments.${i}.documentName`
                          )}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <label
                        className={`${formLabelStyle} flex items-center gap-1`}
                        htmlFor={`tenderSupportDocuments.${i}.documentPurpose`}>
                        Document Purpose
                        <span className='text-red-500'>*</span>
                      </label>
                      <Textarea
                        id={`tenderSupportDocuments.${i}.documentPurpose`}
                        rows={4}
                        className={inputStyle}
                        {...register(
                          `tenderSupportDocuments.${i}.documentPurpose`,
                          {
                            required: "Document purpose is required",
                          }
                        )}
                        placeholder='Explain why this document is important and how bidders should use it'
                      />
                      {getErrorMessage(
                        `tenderSupportDocuments.${i}.documentPurpose`
                      ) && (
                        <p className='text-red-500 text-xs mt-1'>
                          {getErrorMessage(
                            `tenderSupportDocuments.${i}.documentPurpose`
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      className={`${formLabelStyle} flex items-center gap-1`}
                      htmlFor={`file-${i}`}>
                      Document File
                      <span className='text-red-500'>*</span>
                    </label>

                    <Card className='shadow-sm overflow-hidden border-gray-200 mt-2'>
                      <CardContent className='p-0'>
                        <div className='p-4'>
                          <div className='mb-2'>
                            <p className='text-sm text-gray-600 mb-2'>
                              Upload a PDF file (max 5MB)
                            </p>

                            <Input
                              id={`file-${i}`}
                              type='file'
                              className='hidden'
                              accept='application/pdf'
                              {...register(
                                `tenderSupportDocuments.${i}.document`,
                                {
                                  required: "Document file is required",
                                }
                              )}
                            />

                            {watch(
                              `tenderSupportDocuments.${i}.document[0]`
                            ) ? (
                              <div className='border-2 border-dashed p-4 cursor-pointer border-green-400 bg-green-50 rounded-lg flex flex-col gap-2 items-center justify-center transition-colors'>
                                <p className='line-clamp-1 text-green-700 font-medium w-full text-center'>
                                  {
                                    watch(
                                      `tenderSupportDocuments.${i}.document[0]`
                                    ).name
                                  }
                                </p>
                                <p className='text-xs text-green-600'>
                                  Click to replace file
                                </p>
                              </div>
                            ) : (
                              <label
                                htmlFor={`file-${i}`}
                                className='border-2 border-dashed p-4 cursor-pointer border-gray-300 hover:border-primary hover:bg-primary/5 rounded-lg flex flex-col gap-2 items-center justify-center transition-colors'>
                                <FileUp className='w-10 h-10 text-gray-400' />
                                <p className='text-center text-sm font-medium text-gray-700 flex flex-col'>
                                  <span>Click to upload PDF</span>
                                  <span className='text-xs text-gray-500 mt-1'>
                                    or drag and drop
                                  </span>
                                </p>
                              </label>
                            )}

                            {getErrorMessage(
                              `tenderSupportDocuments.${i}.document`
                            ) && (
                              <p className='text-red-500 text-xs mt-2'>
                                {getErrorMessage(
                                  `tenderSupportDocuments.${i}.document`
                                )}
                              </p>
                            )}
                          </div>

                          {watch(`tenderSupportDocuments.${i}.document[0]`) && (
                            <div className='mt-3 flex justify-center'>
                              <Button
                                type='button'
                                onClick={() =>
                                  handleViewPdf(
                                    watch(
                                      `tenderSupportDocuments.${i}.document[0]`
                                    )
                                  )
                                }
                                className='text-primary bg-primary/10 hover:bg-primary/20 rounded-md flex items-center gap-2 transition-colors'>
                                <Eye size={16} /> Preview Document
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-between mt-8'>
          <Button
            type='button'
            className='bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2'
            onClick={() => setActive(0)}>
            <ArrowLeft size={16} /> Previous Step
          </Button>
          <Button
            type='button'
            className='bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2'
            onClick={() => setActive(2)}>
            Continue to Vendor Requirements <ArrowRight size={16} />
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
