"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

interface SideBardOptionHoverCardProps {
  items: { name: string; path?: string }[];
  children: React.ReactNode;
}

const SideBardOptionHoverCard = ({
  items,
  children,
}: SideBardOptionHoverCardProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // useEffect(() => {
  //   return () => {};
  // }, [pathname]);

  return (
    <div
      onClick={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onMouseOver={() => setOpen(true)}
    >
      <HoverCard openDelay={0} closeDelay={0} open={open}>
        <HoverCardTrigger
          className={`flex ${
            items[0].path &&
            items[0].path.length > 1 &&
            pathname.startsWith(items[0].path)
              ? "text-[#3E80F9]"
              : items[0].path &&
                items[0].path.length === 1 &&
                items[0].path !== "#" &&
                pathname.length === 1 &&
                "text-[#3E80F9]"
          } justify-center items-center size-10 p-2 hover:cursor-pointer hover:text-[#3E80F9] rounded-md`}
          onClick={() => {
            if (items[0].path) router.push(items[0].path);
          }}
        >
          {children}
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          side={isMobile ? "top" : "right"}
          className={` w-screen md:w-min  dark:bg-woodsmoke-300 dark:text-woodsmoke-50 ${
            items.length === 1 ? "hidden md:flex" : ""
          }`}
        >
          {items.map((item) => (
            <Button
              key={item.path}
              variant="link"
              className="w-full hover:font-bold "
              onClick={() => {
                if (item.path) router.push(item.path);
              }}
            >
              {item.name}
            </Button>
          ))}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default SideBardOptionHoverCard;
