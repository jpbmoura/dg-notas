"use client";

import { CircleHelp, Lightbulb, LogOut, User, Wrench } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useThemeStore } from "@/store/theme-store";

const SideBarUserButton = () => {
  const { isDark, setIsDark } = useThemeStore();

  function isMobileScreen() {
    return window.innerWidth <= 768;
  }
  return (
    <Popover>
      <PopoverTrigger className="flex justify-center items-center size-10 rounded-full p-2 bg-azure-radiance-500 text-white">
        <User className="size-full" />
      </PopoverTrigger>
      <PopoverContent
        side={isMobileScreen() ? "top" : "right"}
        className="md:w-[220px] w-screen  dark:bg-woodsmoke-300 dark:text-woodsmoke-50"
        align="start"
      >
        <div className="flex flex-row gap-1 items-center border dark:border-woodsmoke-100 w-full p-2 h-14 rounded-md">
          <div className="flex flex-col">
            <span className="text-lg">Matheus Augusto</span>
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

          <Button variant="link">
            <LogOut className="" />
            Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SideBarUserButton;
