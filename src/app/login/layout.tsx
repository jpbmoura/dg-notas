import dgLogo from "@/assets/images/dg-logo.png";
import Image from "next/image";
import React from "react";
import { ThemeButton } from "@/components/theme-button";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div
      className={
        "flex  justify-center items-center w-full h-dvh overflow-auto dark:bg-[#1E1E1E]"
      }
    >
      <div className="absolute top-0 right-0 p-8">
        <ThemeButton />
      </div>
      <div className="md:border border-[#8E95A2] dark:border-[#8E95A2] w-[428px] h-auto rounded-xl p-6 flex flex-col items-center  gap-8 md:gap-4">
        <Image src={dgLogo} alt="Logo" className="w-14 h-14" />
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
