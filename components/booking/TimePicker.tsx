"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ClockIcon } from "@/components/ui/Icons";
import { clsx } from "@/lib/clsx";

interface TimePickerProps {
  label: string;
  value: string; // "HH:mm" e.g. "07:00"
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}

// Generate 30-minute time intervals across 24 hours
const TIME_OPTIONS: { raw: string; display: string }[] = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    const raw = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const period = h >= 12 ? "PM" : "AM";
    const twelveHour = h % 12 === 0 ? 12 : h % 12;
    const display = `${twelveHour}:${String(m).padStart(2, "0")} ${period}`;
    TIME_OPTIONS.push({ raw, display });
  }
}

function formatDisplayTime(rawTime: string) {
  if (!rawTime) return "";
  const option = TIME_OPTIONS.find((t) => t.raw === rawTime);
  if (option) return option.display;

  // Fallback parser if custom time
  const [hStr, mStr] = rawTime.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return rawTime;
  const period = h >= 12 ? "PM" : "AM";
  const twelveHour = h % 12 === 0 ? 12 : h % 12;
  return `${twelveHour}:${String(m).padStart(2, "0")} ${period}`;
}

export function TimePicker({
  label,
  value,
  onChange,
  placeholder = "Select time",
  required = false,
}: TimePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  // Close dropdown on outside click
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

  // Scroll to selected time when opened
  useEffect(() => {
    if (isOpen && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ block: "center" });
    }
  }, [isOpen]);

  function handleSelect(raw: string) {
    onChange(raw);
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
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={clsx(
          "flex w-full items-center gap-2.5 rounded-md border border-border bg-white px-3.5 py-2.5 text-left text-[14px] transition-colors focus:border-primary focus:outline-none",
          isOpen ? "border-primary ring-1 ring-primary/20" : "hover:border-border",
        )}
      >
        <ClockIcon className="h-4 w-4 shrink-0 text-text-muted" />
        <span className={clsx("flex-1 truncate", value ? "text-ink" : "text-text-muted")}>
          {value ? formatDisplayTime(value) : placeholder}
        </span>
      </button>

      {/* Modern Time Selector Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Choose Time"
          className="absolute top-full left-0 z-50 mt-2 max-h-60 w-full min-w-[170px] overflow-y-auto rounded-xl border border-border/80 bg-white py-1.5 shadow-xl select-none animate-in fade-in zoom-in-95 duration-150"
        >
          {TIME_OPTIONS.map((item) => {
            const isSelected = value === item.raw;
            return (
              <button
                key={item.raw}
                ref={isSelected ? selectedItemRef : undefined}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.raw)}
                className={clsx(
                  "flex w-full items-center px-4 py-2.5 text-left text-[14px] transition-colors",
                  isSelected
                    ? "bg-tint-blue-100 font-semibold text-primary"
                    : "text-ink hover:bg-surface-alt hover:text-primary",
                )}
              >
                {item.display}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
