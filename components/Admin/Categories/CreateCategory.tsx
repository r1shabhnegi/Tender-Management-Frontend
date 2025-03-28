"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesParentsNameQuery,
  useGetCategoryQuery,
} from "@/Redux/category/categoryApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formLabelStyle, inputStyle } from "@/app/Styles";
import InfoCard from "@/components/Shared/InfoCard";

interface FormData {
  name: string;
  shortName: string;
  type: "main category" | "sub category";
  scope: "product" | "service";
  status: "active" | "inactive";
  subCategoryMain: string;
}

const CreateCategory = () => {
  const { id: categoryId } = useParams();
  const router = useRouter();
  const isEditMode = Boolean(categoryId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      shortName: "",
      type: "main category",
      scope: "product",
      status: "active",
      subCategoryMain: "",
    },
  });

  const { data: categoryDataById, isSuccess: isSuccessCategory } =
    useGetCategoryQuery(categoryId, {
      skip: !isEditMode,
    });
  const { data: categoriesNames, isLoading: isCategoriesNameLoading } =
    useGetCategoriesParentsNameQuery({});
  const [createCategory, { isLoading: isCreateLoading }] =
    useCreateCategoryMutation();
  const [editCategory, { isLoading: isEditLoading }] =
    useEditCategoryMutation();
  const isLoading = isCreateLoading || isEditLoading;

  const [categories, setCategories] = useState<{ name: string; id: string }[]>(
    []
  );
  useEffect(() => {
    if (categoriesNames?.categories) {
      setCategories(categoriesNames.categories);
    }
  }, [categoriesNames]);

  useEffect(() => {
    if (isEditMode && categoryDataById && isSuccessCategory) {
      const category = categoryDataById.category;
      reset({
        name: category.name,
        shortName: category.shortName,
        type: category.type.toLowerCase() as "main category" | "sub category",
        scope: category.scope as "product" | "service",
        status: category.status as "active" | "inactive",
        subCategoryMain: category.sub_category_main || "",
      });
    }
  }, [isEditMode, categoryDataById, isSuccessCategory, reset]);

  const watchType = watch("type");

  const onSubmit = async (data: FormData) => {
    if (data.type === "sub category" && !data.subCategoryMain) {
      toast.error("Please select a Parent Category");
      return;
    }
    try {
      const categoryPayload = {
        name: data.name,
        shortName: data.shortName.toUpperCase(),
        type: data.type,
        scope: data.scope,
        status: data.status,
        isSubCategory: data.type === "sub category",
        subCategoryMain:
          data.type === "sub category" ? data.subCategoryMain : null,
      };
      if (isEditMode) {
        const response = await editCategory({
          data: categoryPayload,
          id: categoryId,
        }).unwrap();
        if (response) {
          router.push("/admin/categories");
          toast.success("Category updated successfully");
        }
      } else {
        const response = await createCategory(categoryPayload).unwrap();
        if (response) {
          router.push("/admin/categories");
          toast.success("Category created successfully");
        }
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save category. Please try again."
      );
    }
  };

  if (isCategoriesNameLoading) {
    return (
      <div className='flex justify-center py-8'>
        <LoaderCircle className='animate-spin h-8 w-8 text-blue-500' />
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='mx-16 flex my-10 gap-2 flex-col items-center justify-center relative'>
        <h1 className='text-3xl text-gray-900 font-semibold'>Category</h1>
        <p className='text-gray-700'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <InfoCard
        title={isEditMode ? "Edit Category" : "Add New Category"}
        className='w-full max-w-[40rem]'
        backButtonLink='/admin/categories'>
        <form
          className='flex  flex-col gap-7'
          onSubmit={handleSubmit(onSubmit)}>
          {/* Category Name */}
          <div className='flex flex-col flex-1 justify-center'>
            <label className={formLabelStyle}>Category Name</label>
            <Input
              className={inputStyle}
              type='text'
              placeholder='Enter Category Name'
              {...register("name", {
                required: "Category name is required",
              })}
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div className='flex flex-col flex-1 justify-center'>
            <label className={formLabelStyle}>Short Name</label>
            <Input
              className={inputStyle}
              type='text'
              maxLength={3}
              placeholder='Enter Short Name'
              {...register("shortName", {
                required: "Short Name is required",
              })}
            />
            {errors.shortName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.shortName.message}
              </p>
            )}
          </div>
          {/* Category Type */}
          <div className='flex flex-col flex-1 justify-center'>
            <label className={formLabelStyle}>Select Category</label>
            <Controller
              name='type'
              control={control}
              rules={{ required: "Please select a category type" }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className='flex items-center gap-14 mt-2'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='main category'
                      id='r1'
                    />
                    <label htmlFor='r1'>Main Category</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='sub category'
                      id='r2'
                      className='custom-radio'
                    />
                    <label htmlFor='r2'>Sub Category</label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.type && (
              <p className='text-red-500 text-sm mt-1'>{errors.type.message}</p>
            )}
          </div>
          {/* Parent Category for Sub Category */}
          {watchType === "sub category" && (
            <div className='flex flex-col flex-1 justify-center'>
              <label
                className={formLabelStyle}
                htmlFor='parent-category'>
                Select Parent Category
              </label>
              <Controller
                name='subCategoryMain'
                control={control}
                rules={{
                  required:
                    watchType === "sub category"
                      ? "Please select a Parent Category"
                      : false,
                }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger className='bg-white'>
                      <SelectValue placeholder='Select Parent / Main Category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.name.toLowerCase()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subCategoryMain && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.subCategoryMain.message}
                </p>
              )}
            </div>
          )}
          {/* Scope */}
          <div className='flex flex-col flex-1 justify-center'>
            <label className={formLabelStyle}>Select Scope</label>
            <Controller
              name='scope'
              control={control}
              rules={{ required: "Please select a scope" }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className='flex items-center gap-14 mt-2'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='product'
                      id='s1'
                    />
                    <label htmlFor='s1'>Product</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='service'
                      id='s2'
                    />
                    <label htmlFor='s2'>Service</label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.scope && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.scope.message}
              </p>
            )}
          </div>
          {/* Status */}
          <div className='flex flex-col flex-1 justify-center'>
            <label className={formLabelStyle}>Status</label>
            <Controller
              name='status'
              control={control}
              rules={{ required: "Please select a status" }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className='flex items-center gap-14 mt-2'>
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
              )}
            />
            {errors.status && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.status.message}
              </p>
            )}
          </div>
          <div className='flex w-full justify-end'>
            <Button
              className='bg-blue-600 mt-5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300'
              type='submit'
              disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className='animate-spin mr-2' />
              ) : null}
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </InfoCard>
    </div>
  );
};

export default CreateCategory;
