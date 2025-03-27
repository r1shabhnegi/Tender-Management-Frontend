import { formLabelStyle, inputStyle } from "@/app/Styles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import React, { FC } from "react";
import { toast } from "sonner";
import { useFieldArray, useFormContext } from "react-hook-form";
import InfoCard from "@/components/Shared/InfoCard";

interface Props {
  setActive: (active: number) => void;
}

const VenderDocRequirement: FC<Props> = ({ setActive }) => {
  const { control, register, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "venderDocRequirement",
  });

  function addDocumentDefinition() {
    const documents = watch("venderDocRequirement");
    const lastDocument = documents[documents.length - 1];

    if (
      lastDocument &&
      lastDocument.name &&
      lastDocument.type &&
      lastDocument.purpose
    ) {
      append({ name: "", type: "", purpose: "" });
    } else {
      toast.error(
        "Please fill in the previous document details before adding a new one."
      );
    }
  }

  return (
    <InfoCard
      title='Vendor Document Requirements'
      information='Add the documents that you want the vendors to submit.'>
      <div className='flex mb-5 justify-end'>
        <Button
          type='button'
          variant={"outline"}
          onClick={addDocumentDefinition}>
          <Plus /> Add
        </Button>
      </div>
      <div>
        {fields.map((field, i) => (
          <div
            key={field.id}
            className='pb-5 mb-5'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-lg font-medium underline-offset-2'>
                Document {i + 1}
              </h2>

              {fields.length > 1 && (
                <a onClick={() => remove(i)}>
                  <Trash className='size-5' />
                </a>
              )}
            </div>

            <div className='flex gap-8'>
              <div className='flex gap-5 flex-col flex-1'>
                <div>
                  <label
                    className={formLabelStyle}
                    htmlFor={`venderDocRequirement.${i}.name`}>
                    Name
                  </label>
                  <Input
                    className={inputStyle}
                    placeholder='Write the document name'
                    {...register(`venderDocRequirement.${i}.name`)}
                  />
                </div>
                <div>
                  <label
                    className={formLabelStyle}
                    htmlFor={`venderDocRequirement.${i}.type`}>
                    Type
                  </label>
                  <Select
                    value={watch(`venderDocRequirement.${i}.type`) || ""}
                    onValueChange={(value) => {
                      // Update the field using react-hook-form's setValue
                      setValue(`venderDocRequirement.${i}.type`, value);
                      // control._formValues.bidderDocuments[i].type = value;
                    }}>
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder='Select document format' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='light'>PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='flex-1'>
                <label
                  className={`${formLabelStyle}`}
                  htmlFor={`venderDocRequirement.${i}.purpose`}>
                  Purpose
                </label>

                <Textarea
                  rows={5}
                  className={inputStyle}
                  placeholder='Write the document purpose'
                  {...register(`venderDocRequirement.${i}.purpose`)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className='flex gap-5 justify-between items-center'>
          <Button
            type='button'
            className='bg-blue-200 text-gray-900 rounded-lg font-semibold hover:bg-blue-300 transition-colors duration-300'
            onClick={() => setActive(1)}>
            Previous
          </Button>
          {/* <Button type='button'>Reset</Button> */}
          <Button
            type='button'
            className='bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'
            onClick={() => setActive(3)}>
            Next
          </Button>
        </div>
      </div>
    </InfoCard>
  );
};

export default VenderDocRequirement;
