"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronDown,
  Filter,
  SlidersHorizontal,
  Map,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
// import { Input } from "@/components/ui/input";
// import { RotateCcw, Search } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { setTenderHomeSearchQuery } from "@/Redux/tender/tenderSlice";
// import { RootState } from "@/Redux/store";
// import { inputStyle } from "@/app/Styles";

const HomeTendersNavBar = () => {
  // const { tenderHomeSearchQuery } = useSelector(
  //   (state: RootState) => state.tenderSlice
  // );
  // const dispatch = useDispatch();
  // function handleResetNav() {
  //   dispatch(setTenderHomeSearchQuery(""));
  // }

  return (
    <div
      className='flex bg-white border-b border-accent-color-2/10 items-center w-full justify-between sticky top-[3.5rem] p-4 z-[500]'
      style={
        {
          // boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        }
      }>
      <div className='flex flex-wrap gap-3 items-center rounded-lg'>
        <div>
          <Select>
            <SelectTrigger className='border-gray-200 rounded-lg bg-white hover:bg-gray-50'>
              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-blue-600' />
                <SelectValue placeholder='Filter by Category' />
              </div>
            </SelectTrigger>
            <SelectContent className='rounded-lg z-[700] border-gray-200 shadow-md'>
              <SelectGroup>
                <SelectLabel className='text-gray-500'>Categories</SelectLabel>
                <SelectItem value='construction'>Construction</SelectItem>
                <SelectItem value='it'>IT Services</SelectItem>
                <SelectItem value='energy'>Energy</SelectItem>
                <SelectItem value='healthcare'>Healthcare</SelectItem>
                <SelectItem value='education'>Education</SelectItem>
                <SelectItem value='all'>All Categories</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Location Dropdown */}
        <div>
          <Select>
            <SelectTrigger className='w-[180px] rounded-lg border-gray-200 bg-white hover:bg-gray-50'>
              <div className='flex items-center gap-2'>
                <Map className='h-4 w-4 text-green-600' />
                <SelectValue placeholder='Filter by Location' />
              </div>
            </SelectTrigger>
            <SelectContent className='rounded-lg z-[700] border-gray-200 shadow-md'>
              <SelectGroup>
                <SelectLabel className='text-gray-500'>Locations</SelectLabel>
                <SelectItem value='delhi'>Delhi</SelectItem>
                <SelectItem value='mumbai'>Mumbai</SelectItem>
                <SelectItem value='bangalore'>Bangalore</SelectItem>
                <SelectItem value='hyderabad'>Hyderabad</SelectItem>
                <SelectItem value='chennai'>Chennai</SelectItem>
                <SelectItem value='all'>All Locations</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='flex items-center rounded-lg gap-2 bg-white border-gray-200 hover:bg-gray-50'>
              <SlidersHorizontal className='h-4 w-4 text-purple-600' />
              <span>Advanced Filters</span>
              <ChevronDown className='h-4 w-4 ml-1 text-gray-400' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='center'
            className='w-64 rounded-lg z-[700] border-gray-200 shadow-md'>
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <span className='w-32'>Status</span>
              <Select>
                <SelectTrigger className='h-7 min-h-0 ml-auto w-28 text-xs rounded-lg'>
                  <SelectValue placeholder='Any' />
                </SelectTrigger>
                <SelectContent className='z-[800]'>
                  <SelectItem value='open'>Open</SelectItem>
                  <SelectItem value='closed'>Closed</SelectItem>
                  <SelectItem value='draft'>Draft</SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <span className='w-32'>Budget Range</span>
              <Select>
                <SelectTrigger className='h-7 min-h-0 ml-auto w-28 text-xs rounded-lg'>
                  <SelectValue placeholder='Any' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='low'>&lt; 5 Lakhs</SelectItem>
                  <SelectItem value='mid'>5-50 Lakhs</SelectItem>
                  <SelectItem value='high'>&gt; 50 Lakhs</SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <span className='w-32'>Publication Date</span>
              <Select>
                <SelectTrigger className='h-7 min-h-0 ml-auto w-28 text-xs rounded-lg'>
                  <SelectValue placeholder='Any' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='today'>Today</SelectItem>
                  <SelectItem value='week'>This Week</SelectItem>
                  <SelectItem value='month'>This Month</SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className='px-2 py-1.5'>
              <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 rounded-lg'>
                Apply Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='flex items-center gap-2 hover:bg-gray-100 text-gray-700'>
              <span className='text-sm'>Sort by</span>
              <ChevronDown className='h-4 w-4 text-gray-500' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-48 border-gray-200 shadow-md z-[200]'
            sideOffset={8}>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer text-blue-600 font-medium'>
              <ArrowRight className='h-3.5 w-3.5' />
              Latest
            </DropdownMenuItem>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <ArrowRight className='h-3.5 w-3.5 opacity-0' />
              Closing Soon
            </DropdownMenuItem>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <ArrowRight className='h-3.5 w-3.5 opacity-0' />
              Budget (High to Low)
            </DropdownMenuItem>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <ArrowRight className='h-3.5 w-3.5 opacity-0' />
              Budget (Low to High)
            </DropdownMenuItem>
            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
              <ArrowRight className='h-3.5 w-3.5 opacity-0' />
              Alphabetical (A-Z)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HomeTendersNavBar;
