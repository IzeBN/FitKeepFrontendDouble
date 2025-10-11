import { FC, useState } from "react";
import clsx from "clsx";

import { ReactComponent as IconCheck } from "@/shared/assets/icons/check-mark.svg";
import { ReactComponent as IconChevronDown } from "@/shared/assets/icons/chevron-down.svg";
import { SelectOption } from "@/shared/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from "@/shared/ui";
import { cn } from "@/shared/utils";
import cls from "./SelectMultiple.module.scss";

type SelectMultipleProps = {
  options: SelectOption[];
  selectedOptions: SelectOption[];
  onOptionChange: (option: SelectOption) => void;
  placeholder?: string;
  size?: "small" | "big";
  isScrollable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

export const SelectMultiple: FC<SelectMultipleProps> = (props) => {
  const {
    options,
    selectedOptions,
    onOptionChange,
    placeholder = "Выбрать из списка",
    size = "big",
    isScrollable = false,
    isSearchable = false,
    isDisabled = false,
    isLoading = false,
    className,
  } = props;

  const [open, setOpen] = useState<boolean>(false);
  const listboxId = "select-multiple-listbox";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          disabled={isDisabled}
          className={clsx(
            cls.button,
            cls[`button_size-${size}`],
            {
              [cls.button_placeholder]: !selectedOptions.length,
              [cls.button_open]: open,
            },
            className
          )}
        >
          <span className={cn("grow text-start truncate")}>
            {selectedOptions.length
              ? selectedOptions.map((option) => option.label).join(", ")
              : placeholder}
          </span>

          <IconChevronDown
            className={cn(
              "shrink-0 h-[16px] w-[16px]",
              "text-[--color-unimportant]",
              "transition-all duration-200",
              { "rotate-180": open }
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        id={listboxId}
        className={cn(
          "w-full p-0 bg-[--color-white]",
          {
            "rounded-[28px]": size === "big",
            "rounded-[20px]": size === "small",
          },
          "border-[1px] border-solid border-[--color-stroke]",
          "shadow-menu overflow-hidden"
        )}
      >
        <Command aria-multiselectable className="p-0 bg-[--color-white]">
          <CommandInput
            size={size}
            placeholder="Найти ..."
            isDisabled={!isSearchable}
          />

          <CommandList>
            {isScrollable ? (
              <ScrollArea
                className={cn({
                  "h-[240px]": size === "small",
                  "h-[288px]": size === "big",
                })}
              >
                {isSearchable && !isLoading && (
                  <CommandEmpty>Не найдено.</CommandEmpty>
                )}
                <CommandGroup className="p-[8px]">
                  {options.map((option) => {
                    const isSelected = selectedOptions.some(
                      ({ value }) => value === option.value
                    );
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={(currentValue) => {
                          const selected = options.find(
                            (opt) => opt.label === currentValue
                          );
                          if (selected) onOptionChange(selected);
                        }}
                        className={cn(
                          "flex items-center justify-between gap-[8px]",
                          "py-[12px] px-[16px]",
                          "font-[500] text-[--color-black-light]",
                          {
                            "h-[48px] text-[16px] leading-[24px] rounded-[16px]":
                              size === "big",
                            "h-[40px] text-[14px] leading-[16px] rounded-[8px]":
                              size === "small",
                          },
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                          "data-[selected=true]:bg-[--color-blue-light] data-[selected=true]:text-[--color-black]"
                        )}
                      >
                        {option.label}
                        <IconCheck
                          className={cn(
                            "shrink-0 text-[--color-blue]",
                            isSelected ? "h-[16px] w-[16px]" : "h-0 w-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </ScrollArea>
            ) : (
              <>
                {isSearchable && !isLoading && (
                  <CommandEmpty>Не найдено.</CommandEmpty>
                )}
                <CommandGroup className="p-[8px]">
                  {options.map((option) => {
                    const isSelected = selectedOptions.some(
                      ({ value }) => value === option.value
                    );
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          const selected = options.find(
                            (opt) => opt.value === currentValue
                          );
                          if (selected) onOptionChange(selected);
                        }}
                        className={cn(
                          "flex items-center justify-between gap-[8px]",
                          "py-[12px] px-[16px] rounded-[16px]",
                          "font-[500] text-[--color-black-light]",
                          {
                            "h-[48px] text-[16px] leading-[24px]":
                              size === "big",
                            "h-[40px] text-[14px] leading-[16px]":
                              size === "small",
                          },
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                          "data-[selected=true]:bg-[--color-blue-light] data-[selected=true]:text-[--color-black]"
                        )}
                      >
                        {option.label}
                        <IconCheck
                          className={cn(
                            "shrink-0 text-[--color-blue]",
                            isSelected ? "h-[16px] w-[16px]" : "h-0 w-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
