"use client";
import { formLabelStyle } from "@/app/Styles";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  useGetCategoriesNamesQuery,
  useGetVendorCategoryQuery,
  useAddVendorCategoryMutation,
  useUpdateVendorCategoryMutation,
} from "@/Redux/category/categoryApi";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import InfoCard from "@/components/Shared/InfoCard";

interface Props {
  userId?: string;
  isEditMode: boolean;
  userCategoryId?: string;
}

interface FormData {
  categoryId: string;
  status: "active" | "inactive";
  expiresAt: Date | null;
  category: string;
}

interface Category {
  name: string;
  id: string;
}

const AddVendorCategory: FC<Props> = ({
  userId,
  isEditMode,
  userCategoryId,
}) => {
  const {
    // register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      categoryId: "",
      category: "",
      status: "active",
      expiresAt: undefined,
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);

  // Only fetch vendor category data when in edit mode and ID is available
  const { data: categoriesNames, isLoading: isCategoriesNameLoading } =
    useGetCategoriesNamesQuery({});

  const { data: vendorCategoryData, isLoading: isVendorCategoryLoading } =
    useGetVendorCategoryQuery(userCategoryId ?? "", {
      skip: !isEditMode || !userCategoryId,
    });

  const [addVendorCategory, { isLoading: isAddLoading }] =
    useAddVendorCategoryMutation();

  const [updateVendorCategory, { isLoading: isUpdateLoading }] =
    useUpdateVendorCategoryMutation();

  useEffect(() => {
    if (categoriesNames?.categories) {
      setCategories(categoriesNames.categories);
    }
  }, [categoriesNames]);

  useEffect(() => {
    if (isEditMode && vendorCategoryData?.vendorCategory) {
      const categoryData = vendorCategoryData.vendorCategory;
      reset({
        categoryId: categoryData.category_id,
        status: categoryData.status as "active" | "inactive",
        expiresAt: categoryData.expires_at
          ? new Date(categoryData.expires_at)
          : null,
        category: categoryData.category,
      });
    }
  }, [isEditMode, vendorCategoryData, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        categoryId: data.categoryId,
        status: data.status,
        expiresAt: data.expiresAt ? data.expiresAt.toISOString() : null,
        category: data.category,
        userId,
      };

      if (isEditMode && userCategoryId) {
        await updateVendorCategory({
          ...payload,
          id: userCategoryId,
        }).unwrap();
        toast.success("Vendor category updated successfully");
      } else {
        await addVendorCategory(payload).unwrap();
        toast.success("Vendor category added successfully");
        reset({
          categoryId: "",
          category: "",
          status: "active",
          expiresAt: null,
        });
      }
    } catch {
      toast.error("An error occurred while saving vendor category");
    }
  };

  const isLoading =
    isCategoriesNameLoading || (isEditMode && isVendorCategoryLoading);
  const loadingSubmission = isAddLoading || isUpdateLoading;

  // Watch the expiresAt field to display selected date in calendar button
  const expiresAt = watch("expiresAt");

  return (
    <div className='flex items-center justify-between flex-col'>
      <div className='mx-16 flex my-10 gap-2 flex-col items-center justify-center relative'>
        <h1 className='text-3xl text-gray-900 font-semibold'>Category</h1>
        <p className='text-gray-700'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <InfoCard
        title="Vendor's Category"
        className='max-w-[40rem] w-full'>
        {/* <div className='relative py-4'>
          <Link
            href={`/admin/vendors/${userId}`}
            className='absolute left-3 bg-blue-100 hover:bg-gray-300 p-1 rounded-md top-3'>
            <ArrowLeft className='size-8' />
          </Link>
          <h1 className='text-3xl text-gray-700 font-medium mb-2 text-center'>
            {isEditMode ? "Edit Vendor's Category" : "Add Vendor's Category"}
          </h1>
        </div> */}
        <div className='relative'>
          {isLoading ? (
            <div className='flex justify-center py-8'>
              <LoaderCircle className='animate-spin h-8 w-8 text-blue-500' />
            </div>
          ) : (
            <form
              className='flex flex-col gap-7'
              onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col flex-1 justify-center'>
                <label
                  className={formLabelStyle}
                  htmlFor='category-select'>
                  Category
                </label>
                <Select
                  disabled={isEditMode}
                  value={watch("categoryId")}
                  onValueChange={(value) => {
                    const selectedCategory = categories.find(
                      (cat) => cat.id === value
                    );
                    if (selectedCategory) {
                      setValue("categoryId", selectedCategory.id, {
                        shouldValidate: true,
                      });
                      setValue("category", selectedCategory.name);
                    }
                  }}>
                  <SelectTrigger
                    id='category-select'
                    className='bg-white'>
                    <SelectValue placeholder='Select Category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.categoryId.message || "Category is required"}
                  </p>
                )}
              </div>

              <div className='flex flex-col flex-1 justify-center'>
                <label className={formLabelStyle}>Status</label>
                <RadioGroup
                  value={watch("status")}
                  onValueChange={(val) =>
                    setValue("status", val as "active" | "inactive", {
                      shouldValidate: true,
                    })
                  }
                  className='flex items-center gap-14'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='active'
                      id='st1'
                    />
                    <label htmlFor='st1'>Active</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='inactive'
                      id='st2'
                    />
                    <label htmlFor='st2'>Inactive</label>
                  </div>
                </RadioGroup>
                {errors.status && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.status.message || "Status is required"}
                  </p>
                )}
              </div>

              <div className='flex flex-col flex-1 justify-center'>
                <label className={formLabelStyle}>Expires At</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      disabled={isEditMode}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !expiresAt && "text-muted-foreground"
                      )}>
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {expiresAt ? (
                        format(expiresAt, "dd MMM yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0'
                    align='start'>
                    <Calendar
                      mode='single'
                      selected={expiresAt || undefined}
                      onSelect={(date) =>
                        setValue("expiresAt", date ?? null, {
                          shouldValidate: true,
                        })
                      }
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.expiresAt && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.expiresAt.message}
                  </p>
                )}
              </div>

              <div className='flex justify-end'>
                <Button
                  className='bg-blue-600 mt-5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'
                  type='submit'
                  disabled={loadingSubmission}>
                  {loadingSubmission && (
                    <LoaderCircle className='animate-spin mr-2 h-4 w-4' />
                  )}
                  {isEditMode ? "Update" : "Submit"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </InfoCard>
    </div>
  );
};

export default AddVendorCategory;
