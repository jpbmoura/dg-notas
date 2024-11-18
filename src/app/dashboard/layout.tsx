import { LogOut } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import SidebarMenu from "./sidebar-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="w-full h-dvh flex flex-row p-2 gap-2 bg-[#F5F5F5]">
      <div className="bg-white p-2 rounded-lg flex flex-col items-center justify-between">
        <SidebarMenu />

        <div className="flex flex-col justify-center items-center">
          <Separator />
          <LogOut className="size-10 text-7xl p-2 hover:cursor-pointer" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg flex flex-col w-full">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
