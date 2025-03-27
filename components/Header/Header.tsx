"use client";
import { RootState } from "@/Redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

import HeaderDropdown from "./HeaderDropdown";
import { LayoutDashboard, LoaderCircle, LogIn } from "lucide-react";
import { textWithHover } from "@/app/Styles";
import Image from "next/image";
import logo from "@/public/TERI_50.png";
import { Button } from "../ui/button";

const Header = () => {
  const {
    isLoggedIn,
    isRefreshing: isLoading,
    user: { role },
  } = useSelector((state: RootState) => state.authSlice);

  return (
    <header className='fixed border-b backdrop-blur-sm top-0 left-0 flex items-center w-full px-20 z-[50] h-[3.8rem]'>
      <div className='flex justify-between items-center w-full '>
        <div className='flex items-center'>
          <Link
            href='/'
            className='flex items-center gap-2'>
            <Image
              src={logo}
              alt=''
              height={40}
              width={40}
            />
            <span className='text-2xl text-blue-600 font-bold'>TERI</span>
          </Link>
          <span className='flex font-medium ml-16 gap-8'>
            <a className={textWithHover}>Venders</a>
            <a className={textWithHover}>Tenders</a>
            <a className={textWithHover}>Bidding History</a>
          </span>
        </div>

        <div className='flex items-center gap-8 font-medium text-text-secondary-color'>
          {!isLoading ? (
            <>
              {isLoggedIn ? (
                <>
                  {role === "admin" && (
                    <Link href={"/admin"}>
                      <Button className='bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300'>
                        <LayoutDashboard />
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  {role === "vender" && (
                    <Link href={"/vender-board"}>
                      <Button className='bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300'>
                        <LayoutDashboard />
                        Vender Dashboard
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href={"/register"}>
                    <Button className='bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300'>
                      Register Now
                    </Button>
                  </Link>
                  <Link href={"/sign-in"}>
                    <Button className='bg-blue-200 font-semibold rounded-lg hover:bg-blue-300 text-gray-900 transition-colors duration-300'>
                      <LogIn />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <LoaderCircle className='animate-spin mr-28' />
          )}

          {isLoggedIn ? <HeaderDropdown /> : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
