"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DebouncedInput({
  value,
  onChange,
  placeholder,
  className,
}: DebouncedInputProps) {
  const [localValue, setLocalValue] = useState(value);

  const debouncedValue = useDebounce(localValue, 500);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id="search-input"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "pr-10 pl-10 h-11 rounded-xl bg-muted/30 focus-visible:ring-primary",
          className,
        )}
      />
      {localValue && (
        <button
          onClick={() => setLocalValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
