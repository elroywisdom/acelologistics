"use client";

import { useEffect, useId, useRef, useState } from "react";
import { clsx } from "@/lib/clsx";

/** Google Places-backed autocomplete for the Pick Up / Stop / Drop-off
 * fields (El-Roy's 2026-08-19 ask, after confirming Shuttlers.co runs the
 * same Places-powered dropdown behind their own backend). Talks to our own
 * `/api/places/autocomplete` route rather than Google directly — the API
 * key stays server-side (see lib/places.ts).
 *
 * Degrades gracefully: if `GOOGLE_PLACES_API_KEY` isn't set yet, the route
 * always returns an empty suggestion list, so this just behaves like a
 * plain text input with no dropdown — nothing breaks while the key is
 * still being set up. */

type Suggestion = { placeId: string; text: string };

export function LocationAutocompleteInput({
  value,
  onChange,
  placeholder,
  className,
  wrapperClassName = "relative",
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  id?: string;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionTokenRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);

  function getSessionToken() {
    if (!sessionTokenRef.current) {
      sessionTokenRef.current =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    return sessionTokenRef.current;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleChange(next: string) {
    onChange(next);
    setActiveIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = next.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const thisRequestId = ++requestIdRef.current;
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch("/api/places/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: trimmed, sessionToken: getSessionToken() }),
        });
        const result = await response.json();
        // A slower earlier keystroke's request can resolve after a faster
        // later one — ignore anything that isn't the latest request.
        if (thisRequestId !== requestIdRef.current) return;
        const next: Suggestion[] = result.suggestions ?? [];
        setSuggestions(next);
        setOpen(next.length > 0);
      } catch {
        if (thisRequestId !== requestIdRef.current) return;
        setSuggestions([]);
        setOpen(false);
      }
    }, 250);
  }

  function handleSelect(suggestion: Suggestion) {
    onChange(suggestion.text);
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
    // Picking a place ends this Autocomplete session for billing purposes —
    // the next keystroke starts a fresh session token.
    sessionTokenRef.current = null;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      if (activeIndex >= 0) {
        event.preventDefault();
        handleSelect(suggestions[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className={wrapperClassName}>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        autoComplete="off"
        className={className}
      />
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-white py-1 shadow-lg"
        >
          {suggestions.map((suggestion, i) => (
            <li key={suggestion.placeId} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                // Prevents the input from blurring (and this dropdown from
                // closing) before the click's onSelect fires.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(suggestion)}
                className={clsx(
                  "block w-full px-4 py-2 text-left text-[13px] text-ink hover:bg-surface-alt",
                  i === activeIndex && "bg-surface-alt",
                )}
              >
                {suggestion.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
