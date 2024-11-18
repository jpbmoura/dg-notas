"use client";

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
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger className="flex justify-center items-center size-10 p-2">
        {children}
      </HoverCardTrigger>
      <HoverCardContent align="start" side="right">
        {items.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className="w-full hover:font-bold"
            onClick={() => {
              // navigate(item.path);
            }}
          >
            {item.name}
          </Button>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};

export default SideBardOptionHoverCard;
