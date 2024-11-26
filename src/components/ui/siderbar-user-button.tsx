"use client";

import { CircleHelp, Lightbulb, LogOut, User, Wrench } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useThemeStore } from "@/store/theme-store";
import { useEffect, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

// function isMobileScreen() {
//   return window.innerWidth <= 768;
// }

const SideBarUserButton = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isDark, setIsDark } = useThemeStore();
  const { userName } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleLogOut = () => {
    console.log("saindo");

    setCookie(null, "token", "", {
      maxAge: 0, // Remove o cookie imediatamente
      path: "/", // Certifique-se de usar o mesmo caminho do cookie original
    });
    router.push("/login");
  };

  return (
    <Popover>
      <PopoverTrigger className="flex justify-center items-center size-10 rounded-full p-2   dark:text-white">
        <User className="size-full" />
      </PopoverTrigger>
      <PopoverContent
        side={isMobile ? "top" : "right"}
        className="md:w-[220px] w-screen  dark:bg-woodsmoke-300 dark:text-woodsmoke-50"
        align="start"
      >
        <div className="flex flex-row gap-1 items-center border dark:border-woodsmoke-100 w-full p-2 h-14 rounded-md">
          <div className="flex flex-col truncate w-full">
            <span className="text-lg " title={userName}>
              {userName}
            </span>
            <span className="text-sm">Empresa &gt;</span>
          </div>
        </div>

        <div className="flex flex-col justify-start w-full items-start pt-4">
          <Button variant="link">
            <CircleHelp className="" />
            Ajuda
          </Button>
          <Button variant="link">
            <Wrench className="" />
            Configurações
          </Button>
          <Button variant="link" onClick={() => setIsDark(!isDark)}>
            <Lightbulb className="dark:text-yellow-500" />
            Mudar Tema
          </Button>

          <Button variant="link" onClick={() => handleLogOut()}>
            <LogOut className="" />
            Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SideBarUserButton;
