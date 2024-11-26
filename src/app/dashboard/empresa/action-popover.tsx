import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";

export function ActionPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div>Editar</div>
            <div>Excluir</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
