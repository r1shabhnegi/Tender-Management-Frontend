"use client";
import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  setManageTenderSearchQuery,
  setManageTenderStatus,
} from "@/Redux/tender/tenderSlice";
import { RootState } from "@/Redux/store";
import { inputStyle } from "@/app/Styles";

const ManageTendersNavbar: FC = () => {
  const { tenderSearchQueryAdmin, tenderStatusAdmin } = useSelector(
    (state: RootState) => state.tenderSlice
  );
  const dispatch = useDispatch();
  function handleResetNav() {
    dispatch(setManageTenderSearchQuery(""));
    dispatch(setManageTenderStatus(""));
    // setValue("");
  }

  return (
    <div className='sticky bg-white  top-[3.8rem] z-[100] py-4 px-2 justify-between flex items-center'>
      <div className='flex gap-4 items-center w-full'>
        <div className='flex items-center w-[30rem]'>
          <label
            htmlFor='search'
            className='rounded-lg flex w-full items-center bg-white'>
            <div className='relative w-full sm:w-auto sm:flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-700' />
              <Input
                id='search'
                className={inputStyle}
                style={{ paddingLeft: "2rem" }}
                value={tenderSearchQueryAdmin}
                onChange={(e) =>
                  dispatch(setManageTenderSearchQuery(e.target.value))
                }
                placeholder='Search tenders by Title, Category, Location, Department, etc.'
              />
            </div>
          </label>
        </div>
        <div className='rounded-md w-[12rem]'>
          <Select
            value={tenderStatusAdmin}
            onValueChange={(e) => dispatch(setManageTenderStatus(e))}>
            <SelectTrigger className={inputStyle}>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent className='z-[200]'>
              <SelectGroup>
                <SelectItem value='live'>Live Tenders</SelectItem>
                <SelectItem value='draft'>Saved Tenders</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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

export default ManageTendersNavbar;
