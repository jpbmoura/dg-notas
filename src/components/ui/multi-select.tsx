import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  onValueChange: (value: string[]) => void;

  defaultValue?: string[];

  placeholder?: string;

  animation?: number;

  maxCount?: number;

  modalPopover?: boolean;

  asChild?: boolean;

  className?: string;

  disabled?: boolean;

  label?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    { options, onValueChange, defaultValue = [], disabled, label, placeholder },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const [menuWidth, setMenuWidth] = React.useState("auto");

    React.useEffect(() => {
      if (buttonRef.current) {
        setMenuWidth(`${buttonRef.current.offsetWidth}px`);
      }
    }, [buttonRef.current?.offsetWidth]);

    React.useEffect(() => {
      onValueChange(selectedValues);
    }, [selectedValues, onValueChange]);

    return (
      <>
        <span className=" text-sm mb-[-8px] font-medium">{label}</span>
        <DropdownMenu>
          {disabled ? (
            <button
              ref={ref}
              className="border min-h-9 border-woodsmoke-50 dark:border-woodsmoke-100 rounded p-1 flex justify-between px-2 w-full items-center"
            >
              <div
                className="max-w-full max-h-16
             overflow-hidden"
              >
                {selectedValues.map((item) => {
                  return (
                    <Badge
                      className="m-1 bg-azure-radiance-550 dark:bg-azure-radiance-550 dark:text-woodsmoke-50 hover:bg-azure-radiance-550 dark:hover:bg-azure-radiance-550"
                      key={item}
                    >
                      {item}
                    </Badge>
                  );
                })}
              </div>
              <ChevronDown className="h-4 text-[#797874]" />
            </button>
          ) : (
            <DropdownMenuTrigger asChild>
              <div
                ref={buttonRef}
                className="border min-h-9 border-woodsmoke-50 dark:border-woodsmoke-100 rounded p-1 flex justify-between px-2 w-full items-center"
              >
                <div
                  className="max-w-full max-h-16
             overflow-hidden"
                >
                  {selectedValues.length > 0 ? (
                    selectedValues.map((item) => {
                      return (
                        <Badge
                          className="m-1 bg-azure-radiance-550 dark:bg-azure-radiance-550 dark:text-woodsmoke-50"
                          key={item}
                        >
                          {item}
                        </Badge>
                      );
                    })
                  ) : (
                    <span className="text-sm pl-1">{placeholder}</span>
                  )}
                </div>
                <ChevronDown className="h-4 text-[#797874]" />
              </div>
            </DropdownMenuTrigger>
          )}

          <DropdownMenuContent
            style={{ width: menuWidth }}
            className="w-screen  h-72 overflow-auto"
          >
            <DropdownMenuLabel>Selecione um ou mais opções</DropdownMenuLabel>
            {options.map((item) => {
              return (
                <React.Fragment key={item.value}>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedValues.includes(item.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedValues([...selectedValues, item.value]);
                      } else {
                        setSelectedValues(
                          selectedValues.filter((value) => value !== item.value)
                        );
                      }
                    }}
                  >
                    {item.label}
                  </DropdownMenuCheckboxItem>
                </React.Fragment>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
