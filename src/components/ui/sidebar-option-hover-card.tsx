"use client";

import { useState } from "react";
import { Button } from "./button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

interface SideBardOptionHoverCardProps {
  items: { name: string; path: string }[];
  children: React.ReactNode;
}

const SideBardOptionHoverCard = ({
  items,
  children,
}: SideBardOptionHoverCardProps) => {
  const [open, setOpen] = useState(false);

  function isMobileScreen() {
    return window.innerWidth <= 768;
  }

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
          side={isMobileScreen() ? "top" : "right"}
          className="w-screen md:w-min"
        >
          {items.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full hover:font-bold "
              onClick={() => {
                // navigate(item.path);
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
