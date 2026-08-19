"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarIcon } from "@/components/ui/Icons";
import { clsx } from "@/lib/clsx";

interface DatePickerProps {
  label: string;
  value: string; // "YYYY-MM-DD"
  onChange: (val: string) => void;
  minDate?: string; // "YYYY-MM-DD"
  placeholder?: string;
  required?: boolean;
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDisplayDate(isoDate: string) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  const dateObj = new Date(y, m - 1, d);
  return dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function DatePicker({
  label,
  value,
  onChange,
  minDate,
  placeholder = "Select date",
  required = false,
}: DatePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  // Initialize active month/year based on value or today
  const initialDate = value ? new Date(`${value}T00:00:00`) : new Date();
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  // Close calendar on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // When value changes externally, update internal view if needed
  useEffect(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      if (y && m) {
        setCurrentYear(y);
        setCurrentMonth(m - 1);
      }
    }
  }, [value]);

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  }

  // Days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Starting day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  // We convert so Monday is 0, Sunday is 6 (matching Mo Tu We Th Fr Sa Su)
  const firstDayRaw = new Date(currentYear, currentMonth, 1).getDay();
  const startDayOffset = (firstDayRaw + 6) % 7; // Monday = 0, Sunday = 6

  function isDateDisabled(day: number) {
    if (!minDate) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dateStr < minDate;
  }

  function isDateSelected(day: number) {
    if (!value) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return value === dateStr;
  }

  function handleSelectDate(day: number) {
    if (isDateDisabled(day)) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(dateStr);
    setIsOpen(false);
  }

  return (
    <div className="relative flex flex-col gap-1.5" ref={containerRef}>
      <label htmlFor={id} className="text-[13px] font-normal text-ink">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={clsx(
          "flex w-full items-center gap-2.5 rounded-md border border-border bg-white px-3.5 py-2.5 text-left text-[14px] transition-colors focus:border-primary focus:outline-none",
          isOpen ? "border-primary ring-1 ring-primary/20" : "hover:border-border",
        )}
      >
        <CalendarIcon className="h-4 w-4 shrink-0 text-text-muted" />
        <span className={clsx("flex-1 truncate", value ? "text-ink" : "text-text-muted")}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
      </button>

      {/* Modern Calendar Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose Date"
          className="absolute top-full left-0 z-50 mt-2 w-[310px] rounded-2xl border border-border/80 bg-white p-4 shadow-xl select-none animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header with Navigation */}
          <div className="mb-3 flex items-center justify-between px-1">
            <button
              type="button"
              aria-label="Previous Month"
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-alt hover:text-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className="text-[15px] font-medium text-ink">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>

            <button
              type="button"
              aria-label="Next Month"
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-alt hover:text-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Weekday Row: Mo Tu We Th Fr Sa Su */}
          <div className="mb-1.5 grid grid-cols-7 text-center">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-[13px] font-normal text-text-muted">
                {w}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-1 justify-items-center">
            {/* Blank cells for offset */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`blank-${i}`} className="h-9 w-9" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const selected = isDateSelected(day);
              const disabled = isDateDisabled(day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDate(day)}
                  className={clsx(
                    "flex h-9 w-9 items-center justify-center rounded-full text-[14px] transition-all",
                    selected
                      ? "bg-primary font-semibold text-white shadow-sm"
                      : disabled
                        ? "cursor-not-allowed text-text-muted/40"
                        : "text-ink hover:bg-tint-blue-100 hover:text-primary",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
