"use client";
import { RootState } from "@/Redux/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { useTheme } from "next-themes";
import HeaderDropdown from "./HeaderDropdown";
import {
  Bell,
  LayoutDashboard,
  LoaderCircle,
  LogIn,
  Search,
  X,
} from "lucide-react";
import { inputStyle, primaryButtonStyle } from "@/app/Styles";
import Image from "next/image";
import logo from "@/public/TERI_50.png";
import { Button } from "../ui/button";
import { setTenderHomeSearchQuery } from "@/Redux/tender/tenderSlice";
import { Input } from "../ui/input";

const Header = () => {
  const {
    isLoggedIn,
    isRefreshing: isLoading,
    user: { role },
  } = useSelector((state: RootState) => state.authSlice);

  // const { setTheme } = useTheme();

  const { tenderHomeSearchQuery } = useSelector(
    (state: RootState) => state.tenderSlice
  );
  const dispatch = useDispatch();

  function handleResetNav() {
    dispatch(setTenderHomeSearchQuery(""));
  }

  return (
    <header className='fixed border-b border-accent-color-2/10 bg-white/50 backdrop-blur-sm top-0 left-0 flex items-center w-full px-20 z-[600] h-[3.5rem] '>
      <div className='flex justify-between items-center w-full '>
        <div className='flex items-center gap-8'>
          <Link
            href='/'
            className='flex items-center gap-2'>
            <Image
              src={logo}
              alt='TERI Logo'
              height={30}
              width={30}
            />
            <span className='text-2xl text-primary-1 font-bold'>TERI</span>
          </Link>
          <div className='w-[35rem] relative'>
            <label
              htmlFor='search'
              className='rounded-full flex w-full items-center '>
              <div className='relative w-full sm:w-auto sm:flex-1'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-700' />

                {tenderHomeSearchQuery.length > 0 && (
                  <X
                    className='absolute cursor-pointer right-2.5 top-1 size-7 text-gray-700'
                    onClick={handleResetNav}
                  />
                )}

                <Input
                  id='search'
                  className={inputStyle}
                  style={{ paddingLeft: "2rem", paddingRight: "2.5rem" }}
                  value={tenderHomeSearchQuery}
                  onChange={(e) =>
                    dispatch(setTenderHomeSearchQuery(e.target.value))
                  }
                  placeholder='Search tenders by Title, Category, Location, Department, etc.'
                />
              </div>
            </label>
          </div>
        </div>

        <div className='flex items-center gap-5 font-medium text-text-secondary-color'>
          {!isLoading ? (
            <>
              {isLoggedIn ? (
                <>
                  {role === "admin" && (
                    <Link href={"/admin"}>
                      <Button
                        className='bg-white border border-primary-1 text-primary-1 rounded-xl h-8 hover:bg-primary-1/5 hover:text-accent-color-2 px-3'
                        variant={"outline"}>
                        <LayoutDashboard />
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  {role === "vendor" && (
                    <Link href={"/vendor-board"}>
                      <Button className='bg-white border border-primary-1 text-primary-1 rounded-xl  hover:bg-blue-700 hover:text-white px-4'>
                        <LayoutDashboard />
                        Vendor Dashboard
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href={"/sign-in"}>
                    <Button className='bg-white border border-primary-1 text-primary-1 rounded-xl  hover:bg-blue-700 hover:text-white px-4'>
                      <LogIn />
                      Sign In
                    </Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button className={primaryButtonStyle}>Register Now</Button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <LoaderCircle className='animate-spin mr-28' />
          )}
          {/* <Button
            variant='outline'
            size='icon'>
            <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button> */}
          {isLoggedIn ? (
            <>
              <div className='bg-[#F8F8F8] flex items-center justify-center size-9 rounded-full'>
                <Bell className='size-5 text-accent-color-2' />
              </div>
              <HeaderDropdown />
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
