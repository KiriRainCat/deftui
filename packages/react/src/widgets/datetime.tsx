import type { DateRange } from "@daypicker/react";
import type { ComponentProps } from "react";

import { cn } from "cn";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/vendor/shadcn/button";
import { Calendar } from "@/vendor/shadcn/calendar";
import { Input } from "@/vendor/shadcn/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/vendor/shadcn/popover";

type PickerProps<T> = Omit<ComponentProps<typeof Button>, "children" | "render" | "value" | "defaultValue" | "onChange"> & {
  value?: T | null;
  defaultValue?: T | null;
  onChange?: (value: T | null) => void;
  placeholder?: string;
};

type DatePickerProps = PickerProps<Date> & {
  calendarProps?: Omit<Extract<ComponentProps<typeof Calendar>, { mode: "single" }>, "mode" | "required" | "selected" | "onSelect">;
};

type DateRangePickerProps = PickerProps<DateRange> & {
  calendarProps?: Omit<Extract<ComponentProps<typeof Calendar>, { mode: "range" }>, "mode" | "required" | "selected" | "onSelect">;
};

export function TimePicker({ className, step = "1", ...props }: Omit<ComponentProps<typeof Input>, "type">) {
  return (
    <Input
      {...props}
      type="time"
      step={step}
      className={cn(
        "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
        className,
      )}
    />
  );
}

export function DatePicker({
  value,
  defaultValue = null,
  placeholder = "请选择日期",
  disabled,
  onChange,
  className,
  calendarProps,
  ...props
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const date = value === undefined ? internalValue : value;

  function handleSelect(selected: Date | undefined) {
    const nextValue = selected ?? null;
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        render={<Button variant="outline" {...props} disabled={disabled} className={cn("w-full justify-start", className)} />}
      >
        <CalendarIcon aria-hidden="true" />
        {date ? format(date, "PPP") : placeholder}
      </PopoverTrigger>

      <PopoverContent>
        <Calendar
          defaultMonth={date ?? undefined}
          {...calendarProps}
          disabled={disabled || calendarProps?.disabled}
          onSelect={handleSelect}
          selected={date ?? undefined}
          mode="single"
        />
      </PopoverContent>
    </Popover>
  );
}

export function DateRangePicker({
  value,
  defaultValue = null,
  placeholder = "请选择日期范围",
  disabled,
  onChange,
  className,
  calendarProps,
  ...props
}: DateRangePickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const date = value === undefined ? internalValue : value;

  function handleSelect(selected: DateRange | undefined) {
    const nextValue = selected ?? null;
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        render={<Button variant="outline" {...props} disabled={disabled} className={cn("w-full justify-start", className)} />}
      >
        <CalendarIcon aria-hidden="true" />
        {!date?.from ? <span>{placeholder}</span> : <>{format(date.from, "LLL dd, y")}</>}
        {date?.to && <> - {format(date.to, "LLL dd, y")}</>}
      </PopoverTrigger>

      <PopoverContent>
        <Calendar
          defaultMonth={date?.from}
          {...calendarProps}
          disabled={disabled || calendarProps?.disabled}
          onSelect={handleSelect}
          selected={date ?? undefined}
          mode="range"
        />
      </PopoverContent>
    </Popover>
  );
}

export type { DateRange };
