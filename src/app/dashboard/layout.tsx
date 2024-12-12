"use client";
import { LogOut } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import SidebarMenu from "./sidebar-menu";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";
import { parseCookies } from "nookies";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { decodeToken } = useUserStore();

  useEffect(() => {
    const cookies = parseCookies();

    decodeToken(cookies.token);
  }, []);

  return (
    <div className="w-full h-dvh flex flex-col-reverse md:p-2 gap-2 bg-[#F5F5F5] md:flex-row dark:text-woodsmoke-50 dark:bg-woodsmoke-300">
      <div className="bg-[#DADADA] p-2 md:rounded-lg flex flex-row items-center justify-between md:flex-col md:bg-white dark:bg-woodsmoke-200">
        <SidebarMenu />

        <div className="flex flex-col justify-center items-center hidden">
          <Separator />
          <LogOut className="size-10 text-7xl p-2 hover:cursor-pointer" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg flex flex-col w-full h-[calc(100vh-1.25rem)] overflow-auto dark:bg-woodsmoke-200">
        <div className="flex flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
