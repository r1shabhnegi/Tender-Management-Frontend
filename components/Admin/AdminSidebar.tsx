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
  BadgePlus,
  Blocks,
  ChartBarStacked,
  FileArchive,
  LayoutDashboard,
  Shield,
  Users,
} from "lucide-react";

const adminSidebarLinks = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "Create Tender",
    link: "/admin/create-tender",
    icon: BadgePlus,
  },
  {
    title: "Manage Tenders",
    link: "/admin/tenders",
    icon: Blocks,
  },
  {
    title: "Archived Tender",
    link: "/admin/archived",
    icon: FileArchive,
  },
  {
    title: "Manage Vendors",
    link: "/admin/vendors",
    icon: Users,
  },
  {
    title: "Categories",
    link: "/admin/categories",
    icon: ChartBarStacked,
  },
  {
    title: "Bids",
    link: "/admin/bids",
    icon: ArrowDownUp,
  },
  {
    title: "Admin Settings",
    link: "/admin/settings",
    icon: Shield,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className='pt-[3.8rem] flex justify-center items-center'>
      <SidebarGroup className='px-0 pt-[5rem] flex justify-center items-center'>
        <SidebarGroupLabel>
          <div className='flex flex-col items-center justify-center mb-14 mt-8'>
            <Avatar className='size-16 cursor-pointer'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className='text-base cursor-pointer'>Rishabh Negi</p>
          </div>
        </SidebarGroupLabel>
        <SidebarGroupContent className='mt-12'>
          <ScrollArea className='h-[calc(100vh-15rem)]'>
            <SidebarMenu className='px-3'>
              {adminSidebarLinks.map((elm) => {
                const isActive =
                  elm.link === "/admin"
                    ? pathname === elm.link
                    : pathname.startsWith(elm.link);
                return (
                  <SidebarMenuItem
                    key={elm.title}
                    className={`m-1 font-[500] rounded-lg flex items-center justify-center cursor-pointer hover:bg-card-color-darker1 hover:text-gray-900 ${
                      isActive ? "bg-card-color text-blue-800" : ""
                    }`}>
                    <SidebarMenuButton
                      asChild
                      className=''>
                      <Link
                        href={elm.link}
                        className='py-5 pl-10'>
                        <elm.icon
                          className='w-10'
                          size={40}
                        />
                        <span
                          className={`text-base ${
                            isActive ? "font-semibold" : ""
                          }`}>
                          {elm.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </ScrollArea>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}
