import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch } from "react-redux";
import { useLogoutQuery } from "@/Redux/auth/authApi";
import { setLogout } from "@/Redux/auth/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const HeaderDropdown = () => {
  const [isLogout, setIsLogout] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useLogoutQuery({}, { skip: isLogout });

  useEffect(() => {
    if (data) {
      if ("success" in data) {
        if (data.success === true) {
          dispatch(setLogout());
          toast.success("Logout Successful!");
          router.push("/");
        }
      }
    }
  }, [data, dispatch, router]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='z-[400]'>
        <Avatar className='size-9'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='p-1 mt-1 z-[400] flex flex-col gap-2'
        style={{ width: "10rem" }}>
        <DropdownMenuItem className='text-base font-[500] cursor-pointer text-gray-700'>
          <LogOut />
          <a onClick={() => setIsLogout(false)}>Logout</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
