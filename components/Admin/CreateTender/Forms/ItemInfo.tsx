import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formLabelStyle, inputStyle } from "@/app/Styles";
import { departments } from "@/lib/constants";
import InfoCard from "@/components/Shared/InfoCard";
import { capitalizeFirstLetter } from "@/lib/helper";

interface Props {
  setActive: (active: number) => void;
  categoriesData: { categories: { id: string; name: string }[] };
}

const ItemInfo: FC<Props> = ({ setActive, categoriesData }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <InfoCard
      title='Tender Item Info'
      information="Fill in the tender's information">
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-6'>
            <div className='flex flex-col flex-1 justify-center'>
              <label
                className={`${formLabelStyle}`}
                htmlFor='company'>
                Company
              </label>
              <Input
                // value='Teri'
                defaultValue='Teri'
                readOnly
                className={inputStyle}
              />

              {errors.company && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.company.message?.toString()}
                </p>
              )}
            </div>
            <div className='flex flex-col flex-1 justify-center'>
              <label
                className={`${formLabelStyle}`}
                htmlFor='department'>
                Department
              </label>
              <Controller
                name='itemInfo.department'
                control={control}
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}>
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder='Select Department' />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem
                          key={department.key}
                          value={department.label}>
                          {department.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.department && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.department.message?.toString()}
                </p>
              )}
            </div>
            <div className='flex flex-col flex-1 justify-center'>
              <label
                className={formLabelStyle}
                htmlFor='itemInfo.tenderNumber'>
                Tender Number
              </label>
              <Input
                className={inputStyle}
                type='number'
                placeholder="Enter tender's number"
                {...register("itemInfo.tenderNumber", {
                  required: "Tender number is required",
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className='flex items-center gap-6'>
            <div className='flex flex-1 gap-6'>
              <div className='flex flex-col flex-1 justify-center'>
                <label
                  className={`${formLabelStyle}`}
                  htmlFor='itemInfo.tenderType'>
                  Tender Type
                </label>
                <Controller
                  name='itemInfo.tenderType'
                  control={control}
                  rules={{ required: "Tender type is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder='Select Tender Type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='public'>Public</SelectItem>
                        <SelectItem value='limited'>Limited</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className='flex flex-col flex-1 justify-center'>
                <label
                  className={`${formLabelStyle}`}
                  htmlFor='itemInfo.tenderScope'>
                  Tender Scope
                </label>
                <Controller
                  name='itemInfo.tenderScope'
                  control={control}
                  rules={{ required: "Tender scope is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder='Select Tender Scope' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='product'>Product</SelectItem>
                        <SelectItem value='service'>Service</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className='flex flex-col flex-1 justify-center'>
                <label
                  className={`${formLabelStyle}`}
                  htmlFor='itemInfo.category'>
                  Tender Category
                </label>
                <Controller
                  name='itemInfo.category'
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder='Select Tender Category' />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData?.categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.name}>
                            {capitalizeFirstLetter(category.name)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-md flex flex-col gap-8'>
          <div className='flex flex-col'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='itemInfo.title'>
              Title
            </label>

            <Input
              className={inputStyle}
              type='text'
              placeholder="Tender's title"
              {...register("itemInfo.title", {
                required: "Title is required",
              })}
            />
          </div>

          <div>
            <label
              className={`${formLabelStyle}`}
              htmlFor='itemInfo.description'>
              Description
            </label>
            <Textarea
              className={inputStyle}
              rows={10}
              placeholder="Tender's description"
              {...register("itemInfo.description", {
                required: "Description is required",
              })}
            />
          </div>
          <div>
            <label
              className={`${formLabelStyle}`}
              htmlFor='itemInfo.technicalPreBidQualification'>
              Technical / Pre-Bid Qualification
            </label>
            <Textarea
              className={inputStyle}
              rows={5}
              placeholder='Write Technical Pre Bid Qualification'
              {...register("itemInfo.technicalPreBidQualification", {
                required: "Technical qualification is required",
              })}
            />
          </div>
        </div>

        <div className='rounded-md flex gap-6'>
          <div className='flex flex-col flex-1'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='itemInfo.technicalWeightage'>
              Technical Weightage (In percentage)
            </label>
            <Input
              className={inputStyle}
              type='number'
              placeholder='Enter technical weightage'
              {...register("itemInfo.technicalWeightage", {
                required: "Technical weightage is required",
                valueAsNumber: true,
                min: { value: 0, message: "Cannot be negative" },
                max: { value: 100, message: "Cannot exceed 100%" },
              })}
            />
          </div>
          <div className='flex flex-col flex-1'>
            <label
              className={`${formLabelStyle}`}
              htmlFor='itemInfo.commercialWeightage'>
              Commercial Weightage(In percentage)
            </label>
            <Input
              className={inputStyle}
              type='number'
              placeholder='Enter commercial weightage'
              {...register("itemInfo.commercialWeightage", {
                required: "Commercial weightage is required",
                valueAsNumber: true,
                min: { value: 0, message: "Cannot be negative" },
                max: { value: 100, message: "Cannot exceed 100%" },
              })}
            />
          </div>
        </div>

        <div className='flex gap-5 justify-end'>
          <Button
            type='button'
            className='bg-blue-600 hover:bg-blue-700 rounded-lg '
            onClick={() => setActive(1)}>
            Next Page
          </Button>
        </div>
      </div>
    </InfoCard>
  );
};

export default ItemInfo;
