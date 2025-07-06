import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

type BirthdayPickerProps = {
  onChange: (value: Date) => void;
  value: Date;
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !Number.isNaN(date.getTime());
}

const BirthdayPicker = ({ onChange, value }: BirthdayPickerProps) => {
  const [open, setOpen] = useState(false);

  const [month, setMonth] = useState<Date | undefined>(value);
  const [currDate, setCurrDate] = useState(() => formatDate(value));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={currDate}
          placeholder="June 01, 2025"
          className="pr-10 bg-white/10 border-white/20 text-white placeholder-white/50"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setCurrDate(e.target.value);
            if (isValidDate(date)) {
              onChange(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:bg-transparent hover:cursor-pointer"
            >
              <CalendarIcon className="size-3.5 text-white" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                onChange(date!);
                setCurrDate(formatDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default BirthdayPicker;
