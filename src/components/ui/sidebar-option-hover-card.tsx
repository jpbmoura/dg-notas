"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { useRouter } from "next/navigation";

interface SideBardOptionHoverCardProps {
  items: { name: string; path: string }[];
  children: React.ReactNode;
}

const SideBardOptionHoverCard = ({
  items,
  children,
}: SideBardOptionHoverCardProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div
      onClick={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onMouseOver={() => setOpen(true)}
    >
      <HoverCard openDelay={0} closeDelay={0} open={open}>
        <HoverCardTrigger className="flex justify-center items-center size-10 p-2 ">
          {children}
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          side={isMobile ? "top" : "right"}
          className="w-screen md:w-min  dark:bg-woodsmoke-300 dark:text-woodsmoke-50"
        >
          {items.map((item) => (
            <Button
              key={item.path}
              variant="link"
              className="w-full hover:font-bold "
              onClick={() => {
                router.push(item.path);
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
