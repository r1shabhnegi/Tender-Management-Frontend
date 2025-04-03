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
import {
  borderStyle,
  inputStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from "@/app/Styles";
import Image from "next/image";
import logo from "@/public/TERI_50.png";
import { Button } from "../ui/button";
import { setTenderHomeSearchQuery } from "@/Redux/tender/tenderSlice";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

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
    <header
      className={cn(
        "fixed border-b bg-white/50 backdrop-blur-sm top-0 left-0 flex items-center w-full px-20 z-[600] h-[3.5rem]",
        borderStyle
      )}>
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
            <span className='text-2xl text-primary font-bold'>TERI</span>
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
                        className={cn(secondaryButtonStyle, "h-8")}
                        variant={"outline"}>
                        <LayoutDashboard />
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  {role === "vendor" && (
                    <Link href={"/vendor-board"}>
                      <Button className={cn(secondaryButtonStyle, "h-8")}>
                        <LayoutDashboard />
                        Vendor Dashboard
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href={"/sign-in"}>
                    <Button className={cn(secondaryButtonStyle, "h-8")}>
                      <LogIn />
                      Sign In
                    </Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button className={cn("h-8", primaryButtonStyle)}>
                      Register Now
                    </Button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <LoaderCircle className='animate-spin mr-28' />
          )}
          {isLoggedIn ? (
            <>
              <div className='bg-[#F8F8F8] cursor-pointer flex items-center justify-center size-9 rounded-full'>
                <Bell className='size-5 text-accent' />
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
