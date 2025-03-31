"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowDownUp,
  BadgeCheck,
  CheckCircle2,
  LayoutDashboard,
  ShoppingBag,
  UserCircle,
} from "lucide-react";

const vendorSidebarLinks = [
  {
    title: "Dashboard",
    link: "/vendor-board",
    icon: LayoutDashboard,
  },
  {
    title: "Purchased Tenders",
    link: "/vendor-board/purchased",
    icon: ShoppingBag,
  },
  {
    title: "Qualified Tenders",
    link: "/vendor-board/qualified",
    icon: BadgeCheck,
  },
  {
    title: "Participated Tenders",
    link: "/vendor-board/participated",
    icon: CheckCircle2,
  },
  {
    title: "Bids",
    link: "/vendor-board/bids",
    icon: ArrowDownUp,
  },
  {
    title: "Profile",
    link: "/vendor-board/profile",
    icon: UserCircle,
  },
];

export const VendorSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className='border-r border-gray-200 pt-14'>
      <ScrollArea className='h-full'>
        <div className='px-4 py-4'>
          <div className='mb-8 flex items-center gap-3'>
            <Avatar>
              <AvatarImage src='/avatar.png' />
              <AvatarFallback>VS</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>Vendor Portal</p>
              <p className='text-xs text-gray-500'>Manage your tenders</p>
            </div>
          </div>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                {vendorSidebarLinks.map((item) => {
                  const isActive =
                    item.link === "/vendor-board"
                      ? pathname === item.link
                      : pathname.startsWith(item.link);
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className={`mb-1 font-semibold text-[0.9em] ${
                        isActive ? "bg-gray-100" : ""
                      }`}>
                      <SidebarMenuButton asChild>
                        <Link href={item.link}>
                          <item.icon className='mr-2 h-5 w-5' />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarMenu>
        </div>
      </ScrollArea>
    </Sidebar>
  );
};
