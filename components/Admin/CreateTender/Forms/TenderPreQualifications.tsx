import { formLabelStyle, inputStyle } from "@/app/Styles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import React, { FC } from "react";
import { toast } from "sonner";
import { useFieldArray, useFormContext } from "react-hook-form";
import InfoCard from "@/components/Shared/InfoCard";

interface Props {
  setActive: (active: number) => void;
}

const TenderPreQualifications: FC<Props> = ({ setActive }) => {
  const { control, register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tenderPreQualifications",
  });

  function addQualificationDoc() {
    const qualifications = watch("tenderPreQualifications");
    const lastQualification = qualifications[qualifications.length - 1];

    if (
      lastQualification &&
      lastQualification.title &&
      lastQualification.description &&
      lastQualification.score
    ) {
      append({ title: "", description: "", score: "" });
    } else {
      toast.error(
        "Please fill in the previous qualification details before adding a new one."
      );
    }
  }

  return (
    <InfoCard
      title='Tender Pre-Qualifications'
      information='Add the pre-qualifications for the tender'>
      <div className='flex justify-end'>
        <Button
          type='button'
          variant={"outline"}
          onClick={addQualificationDoc}>
          + Add
        </Button>
      </div>
      <div className='mt-5'>
        {fields.map((field, i) => (
          <div
            key={field.id}
            className='pb-5 mb-5'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='underline text-lg font-medium underline-offset-2'>
                Document {i + 1}
              </h2>

              {fields.length > 1 && (
                <a onClick={() => remove(i)}>
                  <Trash className='size-5' />
                </a>
              )}
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex-1'>
                <label
                  className={formLabelStyle}
                  htmlFor={`tenderPreQualifications.${i}.title`}>
                  Title
                </label>
                <Input
                  className={inputStyle}
                  placeholder='Enter qualification title'
                  {...register(`tenderPreQualifications.${i}.title`)}
                />
              </div>
              <div className='flex-1'>
                <label
                  className={formLabelStyle}
                  htmlFor={`tenderPreQualifications.${i}.description`}>
                  Description
                </label>
                <Input
                  className={inputStyle}
                  placeholder='Enter qualification description'
                  {...register(`tenderPreQualifications.${i}.description`)}
                />
              </div>
              <div className='flex-1'>
                <label
                  className={formLabelStyle}
                  htmlFor={`tenderPreQualifications.${i}.score`}>
                  Score
                </label>
                <Input
                  type='number'
                  className={inputStyle}
                  placeholder='Enter qualification score'
                  {...register(`tenderPreQualifications.${i}.score`)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className='flex justify-between items-center mt-5 gap-5'>
          <Button
            type='button'
            className='bg-blue-200 rounded-lg text-gray-900 font-semibold hover:bg-blue-300 transition-colors duration-300'
            onClick={() => setActive(4)}>
            Previous
          </Button>

          <Button
            type='button'
            className='bg-blue-600 rounded-lg  font-semibold hover:bg-blue-700 transition-colors duration-300'
            onClick={() => setActive(6)}>
            Next
          </Button>
        </div>
      </div>
    </InfoCard>
  );
};

export default TenderPreQualifications;
