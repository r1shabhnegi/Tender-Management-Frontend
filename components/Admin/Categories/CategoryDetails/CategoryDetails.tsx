"use client";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { FC, useState } from "react";
import CategoryInfo from "./Cards/CategoryInfo";
import ChildCategory from "./Cards/ChildCategory";
import CategoryVenders from "./Cards/CategoryVenders";
import CategoryTenders from "./Cards/CategoryTenders";
import { useGetCategoryQuery } from "@/Redux/category/categoryApi";

interface Props {
  categoryId: string;
}

const CategoryDetails: FC<Props> = ({ categoryId }) => {
  const [active, setActive] = useState(0);
  const { data, isLoading } = useGetCategoryQuery(categoryId);

  if (isLoading)
    return (
      <div className='w-full mt-40 flex items-center justify-center text-center'>
        <LoaderCircle className='animate-spin mx-auto' />
      </div>
    );

  return (
    <div className='my-10 mx-20'>
      <div className='relative my-2 bg-blue-50 rounded-md py-2'>
        <Link
          href='/admin/categories'
          className='absolute left-3 bg-blue-100 p-1 hover:bg-gray-200  rounded-md top-3'>
          <ArrowLeft className='size-8' />
        </Link>
        <h1 className='text-3xl text-gray-700 font-medium mb-2 text-center'>
          Category Details
        </h1>
      </div>
      <div className='flex bg-blue-50 flex-col rounded-lg'>
        <div className=' border-b-[0.1rem] border-gray-500 flex items-center gap-6 font-medium text-gray-700'>
          <button
            className={`px-2 pt-2 pb-1 ${
              active === 0 ? "border-b-[0.15rem] border-gray-600" : ""
            }
              `}
            onClick={() => setActive(0)}>
            Information
          </button>
          {data && data?.category?.is_sub_category !== true ? (
            <button
              className={`px-2 pt-2 pb-1 ${
                active === 1 ? "border-b-[0.15rem] border-gray-600" : ""
              }
                `}
              onClick={() => setActive(1)}>
              Child Category
            </button>
          ) : null}
          <button
            className={`px-2 pt-2 pb-1 ${
              active === 2 ? "border-b-[0.15rem] border-gray-600" : ""
            }
              `}
            onClick={() => setActive(2)}>
            Venders
          </button>
          <button
            className={`px-2 pt-2 pb-1 ${
              active === 3 ? "border-b-[0.15rem] border-gray-600" : ""
            }
              `}
            onClick={() => setActive(3)}>
            Tenders
          </button>
        </div>

        <div>
          {active === 0 ? <CategoryInfo data={data} /> : null}
          {data && data?.category?.is_sub_category === false && active === 1 ? (
            <ChildCategory categoryMain={data?.category.name} />
          ) : null}
          {active === 2 ? <CategoryVenders categoryId={categoryId} /> : null}
          {active === 3 ? <CategoryTenders categoryId={categoryId} /> : null}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
