"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setTenderHomeSearchQuery } from "@/Redux/tender/tenderSlice";
import { RootState } from "@/Redux/store";
import { inputStyle } from "@/app/Styles";

const HomeTendersNavBar = () => {
  const { tenderHomeSearchQuery } = useSelector(
    (state: RootState) => state.tenderSlice
  );
  const dispatch = useDispatch();
  function handleResetNav() {
    dispatch(setTenderHomeSearchQuery(""));
  }

  return (
    <div className='sticky bg-white px-5 top-[3.8rem] z-[100] py-4 justify-between flex items-center'>
      <div className='flex gap-4 items-center w-full'>
        <div className='flex items-center w-[40rem]'>
          <label
            htmlFor='search'
            className='rounded-lg flex w-full items-center bg-white'>
            <div className='relative w-full sm:w-auto sm:flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-700' />
              <Input
                id='search'
                className={inputStyle}
                style={{ paddingLeft: "2rem" }}
                value={tenderHomeSearchQuery}
                onChange={(e) =>
                  dispatch(setTenderHomeSearchQuery(e.target.value))
                }
                placeholder='Search tenders by Title, Category, Location, Department, etc.'
              />
            </div>
          </label>
        </div>

        <Button
          variant={"outline"}
          className=' text-red-600'
          onClick={handleResetNav}>
          <RotateCcw /> Reset
        </Button>
      </div>
    </div>
  );
};

export default HomeTendersNavBar;
